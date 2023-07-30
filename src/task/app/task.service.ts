import { Inject, Injectable } from '@nestjs/common';
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

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
    @Inject('ITaskRepository')
    private readonly badgeProgressRepository: IBadgeProgressRepository,
    @Inject('IPointRepository')
    private readonly pointRepository: IPointRepository,
    @Inject('ITransaction')
    private readonly transaction: ITransaction,
  ) {}

  async getTasksLogs(
    req: ReqGetTasksLogsAppDto,
  ): Promise<ResGetTasksLogsAppDto[]> {
    const { userId, taskTypesId } = req;
    return await this.taskRepository.getTasksLogs(userId, taskTypesId);
  }

  async createTask(req: ReqCreateTaskAppDto): Promise<ResCreateTaskAppDto> {
    await this.taskRepository.createTask(req);
    return { message: CREATE_TASK_SUCCESS_MESSAGE };
  }
  async updateTask(req: ReqUpdateTaskAppDto): Promise<ResUpdateTaskAppDto> {
    await this.taskRepository.updateTask(req);
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
      await this.transaction.beginTransaction();
      await this.taskRepository.completeTask(req.id);
      const isContinuous = await this.pointRepository.isContinuous(
        req.userId,
        HandleDateTime.getYesterday,
      );
      let points: number;
      if (req.taskTypesId === 0) points = isContinuous ? 2 : 1;
      if (req.taskTypesId === 1) points = isContinuous ? 4 : 3;
      if (req.taskTypesId === 2) points = isContinuous ? 6 : 5;
      await this.pointRepository.createPointLog(
        req.userId,
        req.taskTypesId,
        points,
      );

      await this.badgeProgressRepository.updateConsistency(
        req.userId,
        isContinuous,
      );

      let diversutyBadgeId: number;
      if (req.taskTypesId === 0) {
        diversutyBadgeId = 4;
      }
      if (req.taskTypesId === 1) {
        diversutyBadgeId = 5;
      }
      if (req.taskTypesId === 2) {
        diversutyBadgeId = 6;
      }
      await this.badgeProgressRepository.updateDiversity(
        req.userId,
        diversutyBadgeId,
      );

      const todayTasksCount = await this.pointRepository.countTasksPerDate(
        req.userId,
        HandleDateTime.getToday,
      );
      const weeklyTasksCount = await this.pointRepository.countTasksPerDate(
        req.userId,
        HandleDateTime.getToday,
      );
      const monthTasksCount = await this.pointRepository.countTasksPerDate(
        req.userId,
        HandleDateTime.getToday,
      );

      await this.badgeProgressRepository.updateProductivity(
        todayTasksCount,
        req.userId,
        7,
      );
      await this.badgeProgressRepository.updateProductivity(
        weeklyTasksCount,
        req.userId,
        8,
      );
      await this.badgeProgressRepository.updateProductivity(
        monthTasksCount,
        req.userId,
        9,
      );

      await this.transaction.commitTransaction();

      return { message: COMPLETE_TASK_SUCCESS_MESSAGE };
    } catch (error) {
      await this.transaction.rollbackTransaction();
      throw error;
    }
  }
}
