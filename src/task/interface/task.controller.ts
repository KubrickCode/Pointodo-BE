import { Controller, Inject, Get, Post, Patch, Delete } from '@nestjs/common';
import { ITaskService } from '../domain/interfaces/task.service.interface';

@Controller('task')
export class TaskController {
  constructor(
    @Inject('ITaskService')
    private readonly taskService: ITaskService,
  ) {}

  // @Get()
  // async getTasksLogs(
  //   req: ReqGetTasksLogsAppDto,
  // ): Promise<ResGetTasksLogsAppDto[]> {
  //   const { userId, taskTypesId } = req;
  //   return await this.taskService.getTasksLogs(userId, taskTypesId);
  // }

  // @Post()
  // async createTask(req: ReqCreateTaskAppDto): Promise<ResCreateTaskAppDto> {
  //   await this.taskService.createTask(req);
  //   return { message: CREATE_TASK_SUCCESS_MESSAGE };
  // }

  // @Patch()
  // async updateTask(req: ReqUpdateTaskAppDto): Promise<ResUpdateTaskAppDto> {
  //   await this.taskService.updateTask(req);
  //   return { message: UPDATE_TASK_SUCCESS_MESSAGE };
  // }

  // @Delete()
  // async deleteTask(req: ReqDeleteTaskAppDto): Promise<ResDeleteTaskAppDto> {
  //   await this.taskService.deleteTask(req.id);
  //   return { message: DELETE_TASK_SUCCESS_MESSAGE };
  // }
}
