import {
  Controller,
  Inject,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
  Req,
  Param,
  Body,
} from '@nestjs/common';
import { ITaskService } from '../domain/interfaces/task.service.interface';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { globalDocs } from '@shared/docs/global.docs';
import { Request } from 'express';
import {
  ReqGetTasksLogsParamDto,
  ResGetTasksLogsDto,
} from './dto/getTasksLogs.dto';
import { ReqCreateTaskDto, ResCreateTaskDto } from './dto/createTask.dto';
import { ReqUpdateTaskDto, ResUpdateTaskDto } from './dto/updateTask.dto';
import { ReqDeleteTaskParamDto, ResDeleteTaskDto } from './dto/deleteTask.dto';

@Controller('task')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
export class TaskController {
  constructor(
    @Inject('ITaskService')
    private readonly taskService: ITaskService,
  ) {}

  @Get('/:taskTypesId')
  async getTasksLogs(
    @Req() req: Request,
    @Param() param: ReqGetTasksLogsParamDto,
  ): Promise<ResGetTasksLogsDto[]> {
    const userId = req.user.id;
    const { taskTypesId } = param;
    return await this.taskService.getTasksLogs({ userId, taskTypesId });
  }

  @Post('create')
  async createTask(
    @Req() req: Request,
    @Body() body: ReqCreateTaskDto,
  ): Promise<ResCreateTaskDto> {
    const userId = req.user.id;
    return await this.taskService.createTask({ userId, ...body });
  }

  @Patch('update')
  async updateTask(@Body() body: ReqUpdateTaskDto): Promise<ResUpdateTaskDto> {
    return await this.taskService.updateTask(body);
  }

  @Delete('/:id')
  async deleteTask(
    @Param() param: ReqDeleteTaskParamDto,
  ): Promise<ResDeleteTaskDto> {
    return await this.taskService.deleteTask({ id: param.id });
  }
}
