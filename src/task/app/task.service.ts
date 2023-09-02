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
import {
  ReqUpdateTaskAppDto,
  ResUpdateTaskAppDto,
} from '../domain/dto/updateTask.app.dto';
import {
  ReqDeleteTaskAppDto,
  ResDeleteTaskAppDto,
} from '../domain/dto/deleteTask.app.dto';
import {
  ReqGetTasksLogsAppDto,
  ResGetTasksLogsAppDto,
} from '../domain/dto/getTasksLogs.app.dto';
import { IBadgeProgressRepository } from '@badge/domain/interfaces/badgeProgress.repository.interface';
import { IPointRepository } from '@point/domain/interfaces/point.repository.interface';
import {
  ReqCompleteTaskAppDto,
  ResCompleteTaskAppDto,
} from '@task/domain/dto/completeTask.app.dto';
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
import {
  ReqCancleTaskCompletionAppDto,
  ResCancleTaskCompletionAppDto,
} from '@task/domain/dto/cancleTaskCompletion.app.dto';
import { IBadgeAdminRepository } from '@admin/badge/domain/interfaces/badge.admin.repository.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  ReqGetTotalTaskPagesAppDto,
  ResGetTotalTaskPagesAppDto,
} from '@task/domain/dto/getTotalTaskPages.app.dto';
import { IHandleDateTime } from '@shared/interfaces/IHandleDateTime';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
    @Inject('IBadgeProgressRepository')
    private readonly badgeProgressRepository: IBadgeProgressRepository,
    @Inject('IBadgeAdminRepository')
    private readonly badgeAdminRepository: IBadgeAdminRepository,
    @Inject('IPointRepository')
    private readonly pointRepository: IPointRepository,
    @Inject('IUserBadgeRepository')
    private readonly userBadgeRepository: IUserBadgeRepository,
    @Inject('ICacheService')
    private readonly cacheService: ICacheService,
    @Inject('IHandleDateTime')
    private readonly handleDateTime: IHandleDateTime,
  ) {}

  async getTasksLogs(
    req: ReqGetTasksLogsAppDto,
  ): Promise<ResGetTasksLogsAppDto[]> {
    return await this.taskRepository.getTasksLogs(
      req.userId,
      req.taskType,
      req.limit,
      (req.offset - 1) * req.limit,
      req.order,
    );
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
    const createdTask = await this.taskRepository.createTask(
      userId,
      taskType,
      name,
      description,
      importance,
    );

    if (taskType === 'DUE') {
      if (new Date(dueDate) < new Date(this.handleDateTime.getToday())) {
        await this.taskRepository.deleteTask(createdTask.id);
        throw new BadRequestException([DUE_DATE_IN_THE_PAST]);
      }
      await this.taskRepository.createTaskDueDate(createdTask.id, dueDate);
    }

    const result = {
      id: createdTask.id,
      message: CREATE_TASK_SUCCESS_MESSAGE,
    };

    return plainToClass(ResCreateTaskAppDto, result);
  }

  async updateTask(req: ReqUpdateTaskAppDto): Promise<ResUpdateTaskAppDto> {
    await this.taskRepository.updateTask(
      req.id,
      req.name,
      req.description,
      req.importance,
      req.dueDate,
    );

    return { message: UPDATE_TASK_SUCCESS_MESSAGE };
  }

  async deleteTask(req: ReqDeleteTaskAppDto): Promise<ResDeleteTaskAppDto> {
    await this.taskRepository.deleteTask(req.id);
    return { message: DELETE_TASK_SUCCESS_MESSAGE };
  }

  async completeTask(
    req: ReqCompleteTaskAppDto,
  ): Promise<ResCompleteTaskAppDto> {
    try {
      const { taskType, completion, version } =
        await this.taskRepository.completeTask(req.id);

      await this.cacheService.deleteCache(`userBadgeList:${req.userId}`);

      if (completion !== IS_COMPLETED) {
        await this.taskRepository.completeTask(req.id, true); // 롤백
        throw new ConflictException(COMPLETE_TASK_CONFLICT);
      }

      if (version === 1) return { message: COMPLETE_TASK_SUCCESS_MESSAGE };

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

      return { message: COMPLETE_TASK_SUCCESS_MESSAGE };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async cancleTaskCompletion(
    req: ReqCancleTaskCompletionAppDto,
  ): Promise<ResCancleTaskCompletionAppDto> {
    await this.taskRepository.cancleTaskCompletion(req.id);
    return { message: CANCLE_TASK_COMPLETION_SUCCESS_MESSAGE };
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async resetDailyTask() {
    await this.taskRepository.resetDailyTask();
  }
}
