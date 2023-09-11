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
import {
  COMPLETE_TASK_CONFLICT,
  DUE_DATE_IN_THE_PAST,
} from '@shared/messages/task/task.errors';
import {
  A_MONTH,
  A_WEEK,
  A_YEAR,
  DIVERSITY_GOAL,
  IS_COMPLETED,
  PRODUCTIVITY_GOAL_FOR_A_MONTH_AGO,
  PRODUCTIVITY_GOAL_FOR_A_WEEK_AGO,
  PRODUCTIVITY_GOAL_FOR_TODAY,
} from '@shared/constants/task.constant';
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
import { UUID } from 'crypto';
import {
  CONSISTENCY_BADGE_ID1,
  CONSISTENCY_BADGE_ID2,
  CONSISTENCY_BADGE_ID3,
  DIVERSITY_BADGE_ID1,
  DIVERSITY_BADGE_ID2,
  DIVERSITY_BADGE_ID3,
  PRODUCTIVITY_BADGE_ID1,
  PRODUCTIVITY_BADGE_ID2,
  PRODUCTIVITY_BADGE_ID3,
} from '@shared/constants/badge.constant';
import { ALREADY_EXIST_USER_BADGE } from '@shared/messages/badge/badge.errors';
import { TaskType_ } from '@task/domain/entities/task.entity';

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
    const { userId, taskType, limit, completion } = req;
    const totalTasks = await this.taskRepository.getTotalTaskPages(
      userId,
      taskType,
      completion,
    );

    const totalPages = Math.ceil(totalTasks / limit);

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

      await this.updateConsistency(req.userId);
      await this.updateDiversity(req.userId, taskType);
      await this.updateProductivity(req.userId);

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

  async updateConsistency(userId: UUID): Promise<void> {
    const progress = await this.pointRepository.calculateConsistency(userId);
    const consistencyList = {
      [A_WEEK]: CONSISTENCY_BADGE_ID1,
      [A_MONTH]: CONSISTENCY_BADGE_ID2,
      [A_YEAR]: CONSISTENCY_BADGE_ID3,
    };

    for (const prop in consistencyList) {
      const result = await this.badgeProgressRepository.updateConsistency(
        userId,
        progress,
        consistencyList[prop],
      );

      if (result === Number(prop)) {
        try {
          await this.userBadgeRepository.createUserBadgeLog(
            userId,
            consistencyList[prop],
          );
        } catch (error) {
          if (error.message === ALREADY_EXIST_USER_BADGE) return;
        }
      }
    }
  }

  async updateDiversity(userId: UUID, taskType: TaskType_): Promise<void> {
    const diversityList = {
      DAILY: DIVERSITY_BADGE_ID1,
      DUE: DIVERSITY_BADGE_ID2,
      FREE: DIVERSITY_BADGE_ID3,
    };

    const updatedDiversity = await this.badgeProgressRepository.updateDiversity(
      userId,
      diversityList[taskType],
    );

    if (updatedDiversity === DIVERSITY_GOAL) {
      await this.userBadgeRepository.createUserBadgeLog(
        userId,
        diversityList[taskType],
      );
    }
  }

  async updateProductivity(userId: UUID): Promise<void> {
    const productivityList = [
      {
        period: this.handleDateTime.getToday(),
        badgeId: PRODUCTIVITY_BADGE_ID1,
        goal: PRODUCTIVITY_GOAL_FOR_TODAY,
      },
      {
        period: this.handleDateTime.getAWeekAgo(),
        badgeId: PRODUCTIVITY_BADGE_ID2,
        goal: PRODUCTIVITY_GOAL_FOR_A_WEEK_AGO,
      },
      {
        period: this.handleDateTime.getAMonthAgo(),
        badgeId: PRODUCTIVITY_BADGE_ID3,
        goal: PRODUCTIVITY_GOAL_FOR_A_MONTH_AGO,
      },
    ];

    for (const productivity of productivityList) {
      const count = await this.pointRepository.countTasksPerDate(
        userId,
        productivity.period,
      );
      await this.badgeProgressRepository.updateProductivity(
        count,
        userId,
        productivity.badgeId,
      );

      if (count === productivity.goal) {
        await this.userBadgeRepository.createUserBadgeLog(
          userId,
          productivity.badgeId,
        );
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async resetDailyTask() {
    await this.taskRepository.resetDailyTask();
  }
}
