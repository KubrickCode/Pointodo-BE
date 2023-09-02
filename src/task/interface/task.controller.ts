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
  HttpCode,
  Res,
} from '@nestjs/common';
import { ITaskService } from '../domain/interfaces/task.service.interface';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { globalDocs } from '@shared/docs/global.docs';
import { Request, Response } from 'express';
import {
  ReqGetTasksLogsQueryDto,
  ResGetTasksLogsDto,
} from './dto/getTasksLogs.dto';
import { ReqCreateTaskDto } from './dto/createTask.dto';
import { ReqUpdateTaskDto, ReqUpdateTaskParamDto } from './dto/updateTask.dto';
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
import { getTotalTaskPagesDocs } from './docs/getTotalTaskPages.docs';
import {
  ReqGetTotalTaskPagesQueryDto,
  ResGetTotalTaskPagesDto,
} from './dto/getTotalTaskPages.dto';

@Controller('tasks')
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
  @HttpCode(200)
  @ApiOperation(getTasksLogsDocs.operation)
  @ApiOkResponse(getTasksLogsDocs.okResponse)
  async getTasksLogs(
    @Req() req: Request,
    @Query() query: ReqGetTasksLogsQueryDto,
  ): Promise<ResGetTasksLogsDto[]> {
    const { taskType, offset, order, limit } = query;
    return await this.taskService.getTasksLogs({
      userId: req.user.id,
      taskType,
      offset,
      limit,
      order,
    });
  }

  @Get('/count-pages')
  @HttpCode(200)
  @ApiOperation(getTotalTaskPagesDocs.operation)
  @ApiOkResponse(getTotalTaskPagesDocs.okResponse)
  async getTotalTaskPages(
    @Req() req: Request,
    @Query() query: ReqGetTotalTaskPagesQueryDto,
  ): Promise<ResGetTotalTaskPagesDto> {
    const userId = req.user.id;
    const { taskType, limit } = query;
    return await this.taskService.getTotalTaskPages({
      userId,
      taskType,
      limit,
    });
  }

  @Post()
  @HttpCode(201)
  @ApiOperation(createTaskDocs.operation)
  @ApiCreatedResponse(createTaskDocs.createdResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  async createTask(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: ReqCreateTaskDto,
  ): Promise<void> {
    const userId = req.user.id;
    const { id } = await this.taskService.createTask({ userId, ...body });
    res.header('Location', String(id));
    res.send();
  }

  @Patch('/:id')
  @HttpCode(204)
  @ApiOperation(updateTaskDocs.operation)
  @ApiNoContentResponse(updateTaskDocs.noContentResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  async updateTask(
    @Param() param: ReqUpdateTaskParamDto,
    @Body() body: ReqUpdateTaskDto,
  ): Promise<void> {
    await this.taskService.updateTask({ id: param.id, ...body });
    return;
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
