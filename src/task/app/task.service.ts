import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  CANCLE_TASK_COMPLETION_SUCCESS_MESSAGE,
  COMPLETE_TASK_SUCCESS_MESSAGE,
  CREATE_TASK_SUCCESS_MESSAGE,
  DELETE_TASK_SUCCESS_MESSAGE,
  UPDATE_TASK_SUCCESS_MESSAGE,
} from '@shared/messages/task/task.message';
import { ITaskService } from '../domain/interfaces/task.service.interface';
import { ITaskRepository } from '../domain/interfaces/task.repository.interface';
import {
  ReqCreateTaskAppDto,
  ResCreateTaskAppDto,
} from '../domain/dto/createTask.app.dto';
import { ReqUpdateTaskAppDto } from '../domain/dto/updateTask.app.dto';
import { ReqDeleteTaskAppDto } from '../domain/dto/deleteTask.app.dto';
import {
  ReqGetTasksLogsAppDto,
  ResGetTasksLogsAppDto,
} from '../domain/dto/getTasksLogs.app.dto';
import { IBadgeProgressRepository } from '@badge/domain/interfaces/badgeProgress.repository.interface';
import { IPointRepository } from '@point/domain/interfaces/point.repository.interface';
import { ReqCompleteTaskAppDto } from '@task/domain/dto/completeTask.app.dto';
import { IUserBadgeRepository } from '@badge/domain/interfaces/userBadge.repository.interface';
import { setTaskPoints } from './utils/setTaskPoints';
import { completeConsistency } from './utils/completeConsistency';
import { setDiversityBadgeType } from './utils/setDiversityBadgeType';
import { completeDiversity } from './utils/completeDiversity';
import { completeProductivity } from './utils/completeProductivity';
import {
  COMPLETE_TASK_CONFLICT,
  DUE_DATE_IN_THE_PAST,
} from '@shared/messages/task/task.errors';
import { IS_COMPLETED } from '@shared/constants/task.constant';
import { ICacheService } from '@cache/domain/interfaces/cache.service.interface';
import { ReqCancleTaskCompletionAppDto } from '@task/domain/dto/cancleTaskCompletion.app.dto';
import { IBadgeAdminRepository } from '@admin/badge/domain/interfaces/badge.admin.repository.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  ReqGetTotalTaskPagesAppDto,
  ResGetTotalTaskPagesAppDto,
} from '@task/domain/dto/getTotalTaskPages.app.dto';
import { IHandleDateTime } from '@shared/interfaces/IHandleDateTime';
import { plainToClass } from 'class-transformer';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import {
  IBADGE_ADMIN_REPOSITORY,
  IBADGE_PROGRESS_REPOSITORY,
  ICACHE_SERVICE,
  IHANDLE_DATE_TIME,
  IPOINT_REPOSITORY,
  ITASK_REPOSITORY,
  IUSER_BADGE_REPOSITORY,
} from '@shared/constants/provider.constant';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @Inject(ITASK_REPOSITORY)
    private readonly taskRepository: ITaskRepository,
    @Inject(IBADGE_PROGRESS_REPOSITORY)
    private readonly badgeProgressRepository: IBadgeProgressRepository,
    @Inject(IBADGE_ADMIN_REPOSITORY)
    private readonly badgeAdminRepository: IBadgeAdminRepository,
    @Inject(IPOINT_REPOSITORY)
    private readonly pointRepository: IPointRepository,
    @Inject(IUSER_BADGE_REPOSITORY)
    private readonly userBadgeRepository: IUserBadgeRepository,
    @Inject(ICACHE_SERVICE)
    private readonly cacheService: ICacheService,
    @Inject(IHANDLE_DATE_TIME)
    private readonly handleDateTime: IHandleDateTime,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async getTasksLogs(
    req: ReqGetTasksLogsAppDto,
  ): Promise<ResGetTasksLogsAppDto[]> {
    const { userId, taskType, limit, offset, order, completion } = req;
    const result = await this.taskRepository.getTasksLogs(
      userId,
      taskType,
      limit,
      (offset - 1) * limit,
      order,
      completion,
    );
    return result.map((item) => plainToClass(ResGetTasksLogsAppDto, item));
  }

  async getTotalTaskPages(
    req: ReqGetTotalTaskPagesAppDto,
  ): Promise<ResGetTotalTaskPagesAppDto> {
    const totalTasks = await this.taskRepository.getTotalTaskPages(
      req.userId,
      req.taskType,
    );

    const totalPages = Math.ceil(totalTasks / req.limit);

    return { totalPages };
  }

  async createTask(req: ReqCreateTaskAppDto): Promise<ResCreateTaskAppDto> {
    const { userId, taskType, name, description, importance, dueDate } = req;
    const { id } = await this.taskRepository.createTask(
      userId,
      taskType,
      name,
      description,
      importance,
    );

    if (taskType === 'DUE') {
      if (new Date(dueDate) < new Date(this.handleDateTime.getToday())) {
        await this.taskRepository.deleteTask(id);
        throw new BadRequestException([DUE_DATE_IN_THE_PAST]);
      }
      await this.taskRepository.createTaskDueDate(id, dueDate);
    }

    this.logger.log(
      'info',
      `${CREATE_TASK_SUCCESS_MESSAGE}-유저 ID:${userId}, 작업 ID:${id}`,
    );

    return plainToClass(ResCreateTaskAppDto, { id });
  }

  async updateTask(req: ReqUpdateTaskAppDto): Promise<void> {
    const { id, userId, completion } = req;

    if (completion === 1) {
      await this.completeTask({ id, userId });
      this.logger.log('info', `${COMPLETE_TASK_SUCCESS_MESSAGE}-작업 ID:${id}`);
      return;
    }

    if (completion === 0) {
      await this.cancleTaskCompletion({ id });
      this.logger.log(
        'info',
        `${CANCLE_TASK_COMPLETION_SUCCESS_MESSAGE}-작업 ID:${id}`,
      );
      return;
    }

    await this.taskRepository.updateTask(
      id,
      req.name,
      req.description,
      req.importance,
      req.dueDate,
    );

    this.logger.log('info', `${UPDATE_TASK_SUCCESS_MESSAGE}-작업 ID:${id}`);
  }

  async deleteTask(req: ReqDeleteTaskAppDto): Promise<void> {
    await this.taskRepository.deleteTask(req.id);
    this.logger.log('info', `${DELETE_TASK_SUCCESS_MESSAGE}-작업 ID:${req.id}`);
  }

  async completeTask(req: ReqCompleteTaskAppDto): Promise<void> {
    try {
      const { taskType, completion, version } =
        await this.taskRepository.completeTask(req.id);

      await this.cacheService.deleteCache(`userBadgeList:${req.userId}`);

      if (completion !== IS_COMPLETED) {
        await this.taskRepository.completeTask(req.id, true); // 롤백
        throw new ConflictException(COMPLETE_TASK_CONFLICT);
      }

      if (version === 1) return;

      const isContinuous = await this.pointRepository.isContinuous(req.userId);

      await this.pointRepository.createEarnedPointLog(
        req.id,
        req.userId,
        setTaskPoints(taskType, isContinuous),
      );

      const consistencyBadgeNames = [
        '일관성 뱃지1',
        '일관성 뱃지2',
        '일관성 뱃지3',
      ];

      const badgeIds = await Promise.all(
        consistencyBadgeNames.map((badgeName) =>
          this.badgeAdminRepository.getBadgeIdByName(badgeName),
        ),
      );

      const results = [];

      for (const badge of badgeIds) {
        const result = await this.badgeProgressRepository.updateConsistency(
          req.userId,
          isContinuous,
          badge.id,
        );
        results.push(result);
      }

      await completeConsistency(
        results[0],
        req.userId,
        this.userBadgeRepository.createUserBadgeLog.bind(
          this.userBadgeRepository,
        ),
        this.badgeAdminRepository.getBadgeIdByName.bind(
          this.badgeAdminRepository,
        ),
      );

      const updatedDiversity =
        await this.badgeProgressRepository.updateDiversity(
          req.userId,
          await setDiversityBadgeType(
            taskType,
            this.badgeAdminRepository.getBadgeIdByName.bind(
              this.badgeAdminRepository,
            ),
          ),
        );

      await completeDiversity(
        updatedDiversity,
        taskType,
        req.userId,
        this.userBadgeRepository.createUserBadgeLog.bind(
          this.userBadgeRepository,
        ),
        this.badgeAdminRepository.getBadgeIdByName.bind(
          this.badgeAdminRepository,
        ),
      );

      await completeProductivity(
        req.userId,
        this.pointRepository.countTasksPerDate.bind(this.pointRepository),
        this.userBadgeRepository.createUserBadgeLog.bind(
          this.userBadgeRepository,
        ),
        this.badgeProgressRepository.updateProductivity.bind(
          this.badgeProgressRepository,
        ),
        this.badgeAdminRepository.getBadgeIdByName.bind(
          this.badgeAdminRepository,
        ),
        [
          this.handleDateTime.getToday(),
          this.handleDateTime.getAWeekAgo(),
          this.handleDateTime.getAMonthAgo(),
        ],
      );

      await this.taskRepository.lockTask(req.id);
    } catch (error) {
      throw error;
    }
  }

  async cancleTaskCompletion(
    req: ReqCancleTaskCompletionAppDto,
  ): Promise<void> {
    await this.taskRepository.cancleTaskCompletion(req.id);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async resetDailyTask() {
    await this.taskRepository.resetDailyTask();
  }
}
