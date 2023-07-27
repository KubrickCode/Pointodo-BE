import {
  ReqCreateTaskAppDto,
  ResCreateTaskAppDto,
} from '../dto/createTask.app.dto';
import {
  ReqDeleteTaskAppDto,
  ResDeleteTaskAppDto,
} from '../dto/deleteTask.app.dto';
import {
  ReqUpdateTaskAppDto,
  ResUpdateTaskAppDto,
} from '../dto/updateTask.app.dto';

export interface ITaskService {
  createTask(req: ReqCreateTaskAppDto): Promise<ResCreateTaskAppDto>;
  updateTask(req: ReqUpdateTaskAppDto): Promise<ResUpdateTaskAppDto>;
  deleteTask(req: ReqDeleteTaskAppDto): Promise<ResDeleteTaskAppDto>;
}
