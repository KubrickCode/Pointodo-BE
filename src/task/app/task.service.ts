import { Inject, Injectable } from '@nestjs/common';
import {
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

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @Inject('ITasksLogsRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

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
}
