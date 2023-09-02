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
import { ReqDeleteTaskParamDto } from './dto/deleteTask.dto';
import { getTasksLogsDocs } from './docs/getTasksLogs.docs';
import { createTaskDocs } from './docs/createTask.docs';
import { updateTaskDocs } from './docs/updateTask.docs';
import { deleteTaskDocs } from './docs/deleteTask.docs';
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
  @ApiConflictResponse(updateTaskDocs.conflictResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  async updateTask(
    @Req() req: Request,
    @Param() param: ReqUpdateTaskParamDto,
    @Body() body: ReqUpdateTaskDto,
  ): Promise<void> {
    await this.taskService.updateTask({
      userId: req.user.id,
      id: param.id,
      ...body,
    });
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation(deleteTaskDocs.operation)
  @ApiNoContentResponse(deleteTaskDocs.noContentResponse)
  async deleteTask(@Param() param: ReqDeleteTaskParamDto): Promise<void> {
    await this.taskService.deleteTask({ id: param.id });
  }
}
