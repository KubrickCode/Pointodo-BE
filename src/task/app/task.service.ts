import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
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
import { ITransaction } from '@shared/interfaces/transaction.interface';
import { IBadgeProgressRepository } from '@badge/domain/interfaces/badgeProgress.repository.interface';
import { IPointRepository } from '@point/domain/interfaces/point.repository.interface';
import { HandleDateTime } from '@shared/utils/handleDateTime';
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
import { COMPLETE_TASK_CONFLICT } from '@shared/messages/task/task.errors';
import { IS_COMPLETED } from '@shared/constants/task.constant';
import { ICacheService } from '@cache/domain/interfaces/cache.service.interface';
import { ConfigService } from '@nestjs/config';
import { TaskEntity } from '@task/domain/entities/task.entity';
import { cacheConfig } from '@shared/config/cache.config';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
    @Inject('IBadgeProgressRepository')
    private readonly badgeProgressRepository: IBadgeProgressRepository,
    @Inject('IPointRepository')
    private readonly pointRepository: IPointRepository,
    @Inject('ITransaction')
    private readonly transaction: ITransaction,
    @Inject('IUserBadgeRepository')
    private readonly userBadgeRepository: IUserBadgeRepository,
    @Inject('ICacheService')
    private readonly cacheService: ICacheService,
    private readonly configService: ConfigService,
  ) {}

  async getTasksLogs(
    req: ReqGetTasksLogsAppDto,
  ): Promise<ResGetTasksLogsAppDto[]> {
    const { userId, taskType } = req;

    const cacheKey = `tasksLogs:[taskType:${taskType},user:${userId}]`;
    const cachedTasksLogs = await this.cacheService.getFromCache<TaskEntity[]>(
      cacheKey,
    );
    if (cachedTasksLogs) {
      return cachedTasksLogs;
    }

    const result = await this.taskRepository.getTasksLogs(userId, taskType);

    await this.cacheService.setCache(
      cacheKey,
      result,
      cacheConfig(this.configService).cacheTTL,
    );

    return result;
  }

  async createTask(req: ReqCreateTaskAppDto): Promise<ResCreateTaskAppDto> {
    const { userId, taskType, name, description } = req;
    await this.taskRepository.createTask(userId, taskType, name, description);
    await this.cacheService.deleteCache(
      `tasksLogs:[taskType:${taskType},user:${userId}]`,
    );

    return { message: CREATE_TASK_SUCCESS_MESSAGE };
  }
  async updateTask(req: ReqUpdateTaskAppDto): Promise<ResUpdateTaskAppDto> {
    const { id, name, description, importance } = req;
    const result = await this.taskRepository.updateTask(
      id,
      name,
      description,
      importance,
    );
    await this.cacheService.deleteCache(
      `tasksLogs:[taskType:${result.taskType},user:${result.userId}]`,
    );

    return { message: UPDATE_TASK_SUCCESS_MESSAGE };
  }
  async deleteTask(req: ReqDeleteTaskAppDto): Promise<ResDeleteTaskAppDto> {
    const result = await this.taskRepository.deleteTask(req.id);
    await this.cacheService.deleteCache(
      `tasksLogs:[taskType:${result.taskType},user:${result.userId}]`,
    );
    return { message: DELETE_TASK_SUCCESS_MESSAGE };
  }

  async completeTask(
    req: ReqCompleteTaskAppDto,
  ): Promise<ResCompleteTaskAppDto> {
    try {
      await this.transaction.beginTransaction();

      await this.taskRepository.completeTask(req.id);

      const { taskType, completion } = await this.taskRepository.getTaskLogById(
        req.id,
      );

      if (completion !== IS_COMPLETED)
        throw new ConflictException(COMPLETE_TASK_CONFLICT);

      const isContinuous = await this.pointRepository.isContinuous(
        req.userId,
        HandleDateTime.getYesterday,
      );

      await this.pointRepository.createPointLog(
        req.userId,
        'EARNED',
        taskType,
        setTaskPoints(taskType, isContinuous),
      );

      await this.cacheService.deleteCache(`userBadgeProgress:${req.userId}`);
      await this.cacheService.deleteCache(`userBadgeList:${req.userId}`);
      await this.cacheService.deleteCache(`userPointsLogs:${req.userId}`);
      await this.cacheService.deleteCache(`userCurrentPoints:${req.userId}`);
      await this.cacheService.deleteCache(
        `tasksLogs:[taskType:${taskType},user:${req.userId}]`,
      );

      const updatedConsistency =
        await this.badgeProgressRepository.updateConsistency(
          req.userId,
          isContinuous,
        );

      await completeConsistency(
        updatedConsistency,
        req.userId,
        this.userBadgeRepository.createUserBadgeLog,
      );

      const updatedDiversity =
        await this.badgeProgressRepository.updateDiversity(
          req.userId,
          setDiversityBadgeType(taskType),
        );

      await completeDiversity(
        updatedDiversity,
        taskType,
        req.userId,
        this.userBadgeRepository.createUserBadgeLog,
      );

      await completeProductivity(
        req.userId,
        this.pointRepository.countTasksPerDate,
        this.userBadgeRepository.createUserBadgeLog,
        this.badgeProgressRepository.updateProductivity,
      );

      const { completion: updatedCompletion } =
        await this.taskRepository.getTaskLogById(req.id);
      if (updatedCompletion !== IS_COMPLETED)
        throw new ConflictException(COMPLETE_TASK_CONFLICT);

      await this.transaction.commitTransaction();

      return { message: COMPLETE_TASK_SUCCESS_MESSAGE };
    } catch (error) {
      await this.transaction.rollbackTransaction();
      throw error;
    }
  }
}
