import { UUID } from 'crypto';
import { ReqCancleTaskCompletionAppDto } from '../dto/cancleTaskCompletion.app.dto';
import { ReqCompleteTaskAppDto } from '../dto/completeTask.app.dto';
import {
  ReqCreateTaskAppDto,
  ResCreateTaskAppDto,
} from '../dto/createTask.app.dto';
import { ReqDeleteTaskAppDto } from '../dto/deleteTask.app.dto';
import {
  ReqGetTasksLogsAppDto,
  ResGetTasksLogsAppDto,
} from '../dto/getTasksLogs.app.dto';
import {
  ReqGetTotalTaskPagesAppDto,
  ResGetTotalTaskPagesAppDto,
} from '../dto/getTotalTaskPages.app.dto';
import { ReqUpdateTaskAppDto } from '../dto/updateTask.app.dto';
import { TaskType_ } from '../entities/task.entity';

export interface ITaskService {
  getTasksLogs(req: ReqGetTasksLogsAppDto): Promise<ResGetTasksLogsAppDto[]>;

  getTotalTaskPages(
    req: ReqGetTotalTaskPagesAppDto,
  ): Promise<ResGetTotalTaskPagesAppDto>;

  createTask(req: ReqCreateTaskAppDto): Promise<ResCreateTaskAppDto>;

  updateTask(req: ReqUpdateTaskAppDto): Promise<void>;

  deleteTask(req: ReqDeleteTaskAppDto): Promise<void>;

  completeTask(req: ReqCompleteTaskAppDto): Promise<void>;

  cancleTaskCompletion(req: ReqCancleTaskCompletionAppDto): Promise<void>;

  updateConsistency(userId: UUID): Promise<void>;

  updateDiversity(userId: UUID, taskType: TaskType_): Promise<void>;
}
