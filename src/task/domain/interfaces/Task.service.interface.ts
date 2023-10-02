import { UUID } from 'crypto';
import { ReqCancleTaskCompletionAppDto } from '../dto/CancleTaskCompletion.app.dto';
import { ReqCompleteTaskAppDto } from '../dto/CompleteTask.app.dto';
import {
  ReqCreateTaskAppDto,
  ResCreateTaskAppDto,
} from '../dto/CreateTask.app.dto';
import { ReqDeleteTaskAppDto } from '../dto/DeleteTask.app.dto';
import {
  ReqGetTasksLogsAppDto,
  ResGetTasksLogsAppDto,
} from '../dto/GetTasksLogs.app.dto';
import {
  ReqGetTotalTaskPagesAppDto,
  ResGetTotalTaskPagesAppDto,
} from '../dto/GetTotalTaskPages.app.dto';
import { ReqUpdateTaskAppDto } from '../dto/UpdateTask.app.dto';
import { TaskType_ } from '../entities/Task.entity';

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

  updateProductivity(userId: UUID): Promise<void>;
}
