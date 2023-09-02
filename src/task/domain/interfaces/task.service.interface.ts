import {
  ReqCancleTaskCompletionAppDto,
  ResCancleTaskCompletionAppDto,
} from '../dto/cancleTaskCompletion.app.dto';
import {
  ReqCompleteTaskAppDto,
  ResCompleteTaskAppDto,
} from '../dto/completeTask.app.dto';
import {
  ReqCreateTaskAppDto,
  ResCreateTaskAppDto,
} from '../dto/createTask.app.dto';
import {
  ReqDeleteTaskAppDto,
  ResDeleteTaskAppDto,
} from '../dto/deleteTask.app.dto';
import {
  ReqGetTasksLogsAppDto,
  ResGetTasksLogsAppDto,
} from '../dto/getTasksLogs.app.dto';
import {
  ReqGetTotalTaskPagesAppDto,
  ResGetTotalTaskPagesAppDto,
} from '../dto/getTotalTaskPages.app.dto';
import { ReqUpdateTaskAppDto } from '../dto/updateTask.app.dto';

export interface ITaskService {
  getTasksLogs(req: ReqGetTasksLogsAppDto): Promise<ResGetTasksLogsAppDto[]>;

  getTotalTaskPages(
    req: ReqGetTotalTaskPagesAppDto,
  ): Promise<ResGetTotalTaskPagesAppDto>;

  createTask(req: ReqCreateTaskAppDto): Promise<ResCreateTaskAppDto>;

  updateTask(req: ReqUpdateTaskAppDto): Promise<void>;

  deleteTask(req: ReqDeleteTaskAppDto): Promise<ResDeleteTaskAppDto>;

  completeTask(req: ReqCompleteTaskAppDto): Promise<ResCompleteTaskAppDto>;

  cancleTaskCompletion(
    req: ReqCancleTaskCompletionAppDto,
  ): Promise<ResCancleTaskCompletionAppDto>;
}
