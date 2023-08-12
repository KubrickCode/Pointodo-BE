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
import {
  COMPLETE_TASK_CONFLICT,
  DUE_DATE_IN_THE_PAST,
} from '@shared/messages/task/task.errors';
import { GET_TASK_LIMIT, IS_COMPLETED } from '@shared/constants/task.constant';
import { ICacheService } from '@cache/domain/interfaces/cache.service.interface';
import { ConfigService } from '@nestjs/config';
import { TaskEntity } from '@task/domain/entities/task.entity';
import { cacheConfig } from '@shared/config/cache.config';
import {
  ReqCancleTaskCompletionAppDto,
  ResCancleTaskCompletionAppDto,
} from '@task/domain/dto/cancleTaskCompletion.app.dto';
import { IBadgeAdminRepository } from '@admin/badge/domain/interfaces/badge.admin.repository.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IRedisService } from '@redis/domain/interfaces/redis.service.interface';
import {
  ReqGetTotalTaskPagesAppDto,
  ResGetTotalTaskPagesAppDto,
} from '@task/domain/dto/getTotalTaskPages.app.dto';

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
    @Inject('IRedisService')
    private readonly redisService: IRedisService,
    private readonly configService: ConfigService,
  ) {}

  async getTasksLogs(
    req: ReqGetTasksLogsAppDto,
  ): Promise<ResGetTasksLogsAppDto[]> {
    const { userId, taskType, page, order } = req;

    const cacheKey = `${taskType}logs:${userId}-page:${page}&order:${order}`;
    const cachedTasksLogs = await this.cacheService.getFromCache<TaskEntity[]>(
      cacheKey,
    );
    if (cachedTasksLogs) {
      return cachedTasksLogs;
    }

    const result = await this.taskRepository.getTasksLogs(
      userId,
      taskType,
      GET_TASK_LIMIT,
      (page - 1) * GET_TASK_LIMIT,
      order,
    );

    await this.cacheService.setCache(
      cacheKey,
      result,
      cacheConfig(this.configService).cacheTTL,
    );

    return result;
  }

  async getTotalTaskPages(
    req: ReqGetTotalTaskPagesAppDto,
  ): Promise<ResGetTotalTaskPagesAppDto> {
    const { userId, taskType } = req;
    const totalTasks = await this.taskRepository.getTotalTaskPages(
      userId,
      taskType,
    );
    return { totalPages: Math.ceil(totalTasks / GET_TASK_LIMIT) };
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
      if (new Date(dueDate) < new Date(HandleDateTime.getToday))
        throw new BadRequestException(DUE_DATE_IN_THE_PAST);
      await this.taskRepository.createTaskDueDate(createdTask.id, dueDate);
    }

    await this.redisService.deleteKeysByPrefix(`${taskType}logs:${userId}*`);

    return { message: CREATE_TASK_SUCCESS_MESSAGE };
  }

  async updateTask(req: ReqUpdateTaskAppDto): Promise<ResUpdateTaskAppDto> {
    const { id, name, description, importance, dueDate } = req;
    const result = await this.taskRepository.updateTask(
      id,
      name,
      description,
      importance,
      dueDate,
    );

    await this.redisService.deleteKeysByPrefix(
      `${result.taskType}logs:${result.userId}*`,
    );

    return { message: UPDATE_TASK_SUCCESS_MESSAGE };
  }

  async deleteTask(req: ReqDeleteTaskAppDto): Promise<ResDeleteTaskAppDto> {
    const result = await this.taskRepository.deleteTask(req.id);
    await this.redisService.deleteKeysByPrefix(
      `${result.taskType}logs:${result.userId}*`,
    );
    return { message: DELETE_TASK_SUCCESS_MESSAGE };
  }

  async completeTask(
    req: ReqCompleteTaskAppDto,
  ): Promise<ResCompleteTaskAppDto> {
    try {
      const { taskType, completion, version } =
        await this.taskRepository.completeTask(req.id);

      await this.cacheService.deleteCache(`userBadgeProgress:${req.userId}`);
      await this.cacheService.deleteCache(`userBadgeList:${req.userId}`);
      await this.cacheService.deleteCache(`userCurrentPoints:${req.userId}`);
      await this.cacheService.deleteCache(`userEarnedPointsLogs:${req.userId}`);
      await this.redisService.deleteKeysByPrefix(
        `userEarnedPointsLogs:${req.userId}*`,
      );
      await this.redisService.deleteKeysByPrefix(
        `${taskType}logs:${req.userId}*`,
      );

      if (completion !== IS_COMPLETED) {
        await this.taskRepository.completeTask(req.id, true); // 롤백
        throw new ConflictException(COMPLETE_TASK_CONFLICT);
      }

      if (version === 1) return { message: COMPLETE_TASK_SUCCESS_MESSAGE };

      const isContinuous = await this.pointRepository.isContinuous(
        req.userId,
        HandleDateTime.getYesterday,
      );

      await this.pointRepository.createEarnedPointLog(
        req.userId,
        req.id,
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
    const cancledTaskLog = await this.taskRepository.cancleTaskCompletion(
      req.id,
    );
    await this.redisService.deleteKeysByPrefix(
      `${cancledTaskLog.taskType}logs:${cancledTaskLog.userId}*`,
    );
    return { message: CANCLE_TASK_COMPLETION_SUCCESS_MESSAGE };
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async resetDailyTask() {
    await this.redisService.deleteKeysByPrefix('DAILYlogs*');
    await this.taskRepository.resetDailyTask();
  }
}
