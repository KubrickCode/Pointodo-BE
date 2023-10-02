import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { TaskMessage } from '@shared/messages/task/Task.message';
import { ITaskService } from '../domain/interfaces/Task.service.interface';
import { ITaskRepository } from '../domain/interfaces/Task.repository.interface';
import {
  ReqCreateTaskAppDto,
  ResCreateTaskAppDto,
} from '../domain/dto/CreateTask.app.dto';
import { ReqUpdateTaskAppDto } from '../domain/dto/UpdateTask.app.dto';
import { ReqDeleteTaskAppDto } from '../domain/dto/DeleteTask.app.dto';
import {
  ReqGetTasksLogsAppDto,
  ResGetTasksLogsAppDto,
} from '../domain/dto/GetTasksLogs.app.dto';
import { IBadgeProgressRepository } from '@badge/domain/interfaces/BadgeProgress.repository.interface';
import { IPointRepository } from '@point/domain/interfaces/Point.repository.interface';
import { ReqCompleteTaskAppDto } from '@task/domain/dto/CompleteTask.app.dto';
import { IUserBadgeRepository } from '@badge/domain/interfaces/UserBadge.repository.interface';
import { setTaskPoints } from './utils/SetTaskPoints';
import { TaskErrorMessage } from '@shared/messages/task/Task.errors';
import { TaskConstant } from '@shared/constants/Task.constant';
import { ICacheService } from '@cache/domain/interfaces/Cache.service.interface';
import { ReqCancleTaskCompletionAppDto } from '@task/domain/dto/CancleTaskCompletion.app.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  ReqGetTotalTaskPagesAppDto,
  ResGetTotalTaskPagesAppDto,
} from '@task/domain/dto/GetTotalTaskPages.app.dto';
import { IHandleDateTime } from '@shared/interfaces/IHandleDateTime';
import { plainToClass } from 'class-transformer';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ProviderConstant } from '@shared/constants/Provider.constant';
import { UUID } from 'crypto';
import { BadgeConstant } from '@shared/constants/Badge.constant';
import { BadgeErrorMessage } from '@shared/messages/badge/Badge.errors';
import { TaskType_ } from '@task/domain/entities/Task.entity';
import { ITransactionService } from '@shared/interfaces/ITransaction.service.interface';
import { TransactionClient } from '@shared/types/Transaction.type';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @Inject(ProviderConstant.ITASK_REPOSITORY)
    private readonly taskRepository: ITaskRepository,
    @Inject(ProviderConstant.IBADGE_PROGRESS_REPOSITORY)
    private readonly badgeProgressRepository: IBadgeProgressRepository,
    @Inject(ProviderConstant.IPOINT_REPOSITORY)
    private readonly pointRepository: IPointRepository,
    @Inject(ProviderConstant.IUSER_BADGE_REPOSITORY)
    private readonly userBadgeRepository: IUserBadgeRepository,
    @Inject(ProviderConstant.ICACHE_SERVICE)
    private readonly cacheService: ICacheService,
    @Inject(ProviderConstant.IHANDLE_DATE_TIME)
    private readonly handleDateTime: IHandleDateTime,
    @Inject(ProviderConstant.ITRANSACTION_SERVICE)
    private readonly transactionService: ITransactionService,
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
        throw new BadRequestException([TaskErrorMessage.DUE_DATE_IN_THE_PAST]);
      }
      await this.taskRepository.createTaskDueDate(id, dueDate);
    }

    this.logger.log(
      'info',
      `${TaskMessage.CREATE_TASK_SUCCESS_MESSAGE}-유저 ID:${userId}, 작업 ID:${id}`,
    );

    return plainToClass(ResCreateTaskAppDto, { id });
  }

  async updateTask(req: ReqUpdateTaskAppDto): Promise<void> {
    const { id, userId, completion } = req;

    if (completion === 1) {
      await this.completeTask({ id, userId });
      this.logger.log(
        'info',
        `${TaskMessage.COMPLETE_TASK_SUCCESS_MESSAGE}-작업 ID:${id}`,
      );
      return;
    }

    if (completion === 0) {
      await this.cancleTaskCompletion({ id });
      this.logger.log(
        'info',
        `${TaskMessage.CANCLE_TASK_COMPLETION_SUCCESS_MESSAGE}-작업 ID:${id}`,
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

    this.logger.log(
      'info',
      `${TaskMessage.UPDATE_TASK_SUCCESS_MESSAGE}-작업 ID:${id}`,
    );
  }

  async deleteTask(req: ReqDeleteTaskAppDto): Promise<void> {
    await this.taskRepository.deleteTask(req.id);
    this.logger.log(
      'info',
      `${TaskMessage.DELETE_TASK_SUCCESS_MESSAGE}-작업 ID:${req.id}`,
    );
  }

  async completeTask(req: ReqCompleteTaskAppDto): Promise<void> {
    await this.transactionService.runInTransaction(async (tx) => {
      const { taskType, completion, version } =
        await this.taskRepository.completeTask(req.id, tx);

      await this.cacheService.deleteCache(`userBadgeList:${req.userId}`);

      if (completion !== TaskConstant.IS_COMPLETED) {
        throw new ConflictException(TaskErrorMessage.COMPLETE_TASK_CONFLICT);
      }

      if (version === 1) return;

      const isContinuous = await this.pointRepository.isContinuous(
        req.userId,
        tx,
      );

      await this.pointRepository.createEarnedPointLog(
        req.id,
        req.userId,
        setTaskPoints(taskType, isContinuous),
        tx,
      );

      await this.updateConsistency(req.userId, tx);
      await this.updateDiversity(req.userId, taskType, tx);
      await this.updateProductivity(req.userId, tx);

      await this.taskRepository.lockTask(req.id, tx);
    });
  }

  async cancleTaskCompletion(
    req: ReqCancleTaskCompletionAppDto,
  ): Promise<void> {
    await this.taskRepository.cancleTaskCompletion(req.id);
  }

  async updateConsistency(userId: UUID, tx?: TransactionClient): Promise<void> {
    const progress = await this.pointRepository.calculateConsistency(
      userId,
      tx,
    );
    const consistencyList = {
      [TaskConstant.A_WEEK]: BadgeConstant.CONSISTENCY_BADGE_ID1,
      [TaskConstant.A_MONTH]: BadgeConstant.CONSISTENCY_BADGE_ID2,
      [TaskConstant.A_YEAR]: BadgeConstant.CONSISTENCY_BADGE_ID3,
    };

    for (const prop in consistencyList) {
      const result = await this.badgeProgressRepository.updateConsistency(
        userId,
        progress,
        consistencyList[prop],
        tx,
      );

      if (result === Number(prop)) {
        try {
          await this.userBadgeRepository.createUserBadgeLog(
            userId,
            consistencyList[prop],
            tx,
          );
        } catch (error) {
          if (error.message === BadgeErrorMessage.ALREADY_EXIST_USER_BADGE)
            return;
        }
      }
    }
  }

  async updateDiversity(
    userId: UUID,
    taskType: TaskType_,
    tx?: TransactionClient,
  ): Promise<void> {
    const diversityList = {
      DAILY: BadgeConstant.DIVERSITY_BADGE_ID1,
      DUE: BadgeConstant.DIVERSITY_BADGE_ID2,
      FREE: BadgeConstant.DIVERSITY_BADGE_ID3,
    };

    const updatedDiversity = await this.badgeProgressRepository.updateDiversity(
      userId,
      diversityList[taskType],
      tx,
    );

    if (updatedDiversity === TaskConstant.DIVERSITY_GOAL) {
      await this.userBadgeRepository.createUserBadgeLog(
        userId,
        diversityList[taskType],
        tx,
      );
    }
  }

  async updateProductivity(
    userId: UUID,
    tx?: TransactionClient,
  ): Promise<void> {
    const productivityList = [
      {
        period: this.handleDateTime.getToday(),
        badgeId: BadgeConstant.PRODUCTIVITY_BADGE_ID1,
        goal: TaskConstant.PRODUCTIVITY_GOAL_FOR_TODAY,
      },
      {
        period: this.handleDateTime.getAWeekAgo(),
        badgeId: BadgeConstant.PRODUCTIVITY_BADGE_ID2,
        goal: TaskConstant.PRODUCTIVITY_GOAL_FOR_A_WEEK_AGO,
      },
      {
        period: this.handleDateTime.getAMonthAgo(),
        badgeId: BadgeConstant.PRODUCTIVITY_BADGE_ID3,
        goal: TaskConstant.PRODUCTIVITY_GOAL_FOR_A_MONTH_AGO,
      },
    ];

    for (const productivity of productivityList) {
      const count = await this.pointRepository.countTasksPerDate(
        userId,
        productivity.period,
        tx,
      );
      await this.badgeProgressRepository.updateProductivity(
        count,
        userId,
        productivity.badgeId,
        tx,
      );

      if (count === productivity.goal) {
        await this.userBadgeRepository.createUserBadgeLog(
          userId,
          productivity.badgeId,
          tx,
        );
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async resetDailyTask() {
    await this.taskRepository.resetDailyTask();
  }
}
