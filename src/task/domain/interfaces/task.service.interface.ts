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
  ReqUpdateTaskAppDto,
  ResUpdateTaskAppDto,
} from '../dto/updateTask.app.dto';

export interface ITaskService {
  getTasksLogs(req: ReqGetTasksLogsAppDto): Promise<ResGetTasksLogsAppDto[]>;
  createTask(req: ReqCreateTaskAppDto): Promise<ResCreateTaskAppDto>;
  updateTask(req: ReqUpdateTaskAppDto): Promise<ResUpdateTaskAppDto>;
  deleteTask(req: ReqDeleteTaskAppDto): Promise<ResDeleteTaskAppDto>;
  completeTask(req: ReqCompleteTaskAppDto): Promise<ResCompleteTaskAppDto>;
}
