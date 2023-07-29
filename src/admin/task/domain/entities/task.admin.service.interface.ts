import {
  ReqCreateTaskTypeAppDto,
  ResCreateTaskTypeAppDto,
} from '../dto/createTaskType.app.dto';
import { ResDeleteTaskTypeAppDto } from '../dto/deleteTaskType.app.dto';
import {
  ReqUpdateTaskTypeAppDto,
  ResUpdateTaskTypeAppDto,
} from '../dto/updateTaskType.app.dto';
import { TaskTypesEntity } from './taskTypes.entity';

export interface ITaskAdminService {
  getAllTaskTypes(): Promise<TaskTypesEntity[]>;
  createTaskType(
    req: ReqCreateTaskTypeAppDto,
  ): Promise<ResCreateTaskTypeAppDto>;
  updateTaskType(
    req: ReqUpdateTaskTypeAppDto,
  ): Promise<ResUpdateTaskTypeAppDto>;
  deleteTaskType(id: number): Promise<ResDeleteTaskTypeAppDto>;
}
