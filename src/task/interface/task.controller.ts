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
  Query,
} from '@nestjs/common';
import { ITaskService } from '../domain/interfaces/task.service.interface';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { globalDocs } from '@shared/docs/global.docs';
import { Request } from 'express';
import {
  ReqGetTasksLogsQueryDto,
  ResGetTasksLogsDto,
} from './dto/getTasksLogs.dto';
import { ReqCreateTaskDto, ResCreateTaskDto } from './dto/createTask.dto';
import { ReqUpdateTaskDto, ResUpdateTaskDto } from './dto/updateTask.dto';
import { ReqDeleteTaskParamDto, ResDeleteTaskDto } from './dto/deleteTask.dto';
import {
  ReqCompleteTaskParamDto,
  ResCompleteTaskDto,
} from './dto/completeTask.dto';
import { getTasksLogsDocs } from './docs/getTasksLogs.docs';
import { createTaskDocs } from './docs/createTask.docs';
import { updateTaskDocs } from './docs/updateTask.docs';
import { deleteTaskDocs } from './docs/deleteTask.docs';
import { completeTaskDocs } from './docs/completeTask.docs';
import {
  ReqCancleTaskCompletionParamDto,
  ResCancleTaskCompletionDto,
} from './dto/cancleTaskCompletion.dto';
import { cancleTaskCompletionDocs } from './docs/cancleTaskCompletion.docs';

@Controller('task')
@ApiTags('Task')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
export class TaskController {
  constructor(
    @Inject('ITaskService')
    private readonly taskService: ITaskService,
  ) {}

  @Get()
  @ApiOperation(getTasksLogsDocs.operation)
  @ApiOkResponse(getTasksLogsDocs.okResponse)
  async getTasksLogs(
    @Req() req: Request,
    @Query() query: ReqGetTasksLogsQueryDto,
  ): Promise<ResGetTasksLogsDto[]> {
    const userId = req.user.id;
    const { taskType, page, order } = query;
    return await this.taskService.getTasksLogs({
      userId,
      taskType,
      page,
      order,
    });
  }

  @Post('create')
  @ApiOperation(createTaskDocs.operation)
  @ApiCreatedResponse(createTaskDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  async createTask(
    @Req() req: Request,
    @Body() body: ReqCreateTaskDto,
  ): Promise<ResCreateTaskDto> {
    const userId = req.user.id;
    return await this.taskService.createTask({ userId, ...body });
  }

  @Patch('update')
  @ApiOperation(updateTaskDocs.operation)
  @ApiOkResponse(updateTaskDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  async updateTask(@Body() body: ReqUpdateTaskDto): Promise<ResUpdateTaskDto> {
    return await this.taskService.updateTask(body);
  }

  @Delete('/:id')
  @ApiOperation(deleteTaskDocs.operation)
  @ApiOkResponse(deleteTaskDocs.okResponse)
  async deleteTask(
    @Param() param: ReqDeleteTaskParamDto,
  ): Promise<ResDeleteTaskDto> {
    return await this.taskService.deleteTask({ id: param.id });
  }

  @Patch('/complete/:id')
  @ApiOperation(completeTaskDocs.operation)
  @ApiOkResponse(completeTaskDocs.okResponse)
  @ApiConflictResponse(completeTaskDocs.conflictError)
  async completeTask(
    @Req() req: Request,
    @Param() param: ReqCompleteTaskParamDto,
  ): Promise<ResCompleteTaskDto> {
    const userId = req.user.id;
    const id = param.id;
    return await this.taskService.completeTask({ userId, id });
  }

  @Patch('/cancle/:id')
  @ApiOperation(cancleTaskCompletionDocs.operation)
  @ApiOkResponse(cancleTaskCompletionDocs.okResponse)
  async cancleTaskCompletion(
    @Param() param: ReqCancleTaskCompletionParamDto,
  ): Promise<ResCancleTaskCompletionDto> {
    return await this.taskService.cancleTaskCompletion({ id: param.id });
  }
}
