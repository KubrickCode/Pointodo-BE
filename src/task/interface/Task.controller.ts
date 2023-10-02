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
  HttpStatus,
} from '@nestjs/common';
import { ITaskService } from '../domain/interfaces/Task.service.interface';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/Jwt.guard';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { globalDocs } from '@shared/docs/Global.docs';
import { Request, Response } from 'express';
import {
  ReqGetTasksLogsQueryDto,
  ResGetTasksLogsDto,
} from './dto/GetTasksLogs.dto';
import { ReqCreateTaskDto } from './dto/CreateTask.dto';
import { ReqUpdateTaskDto, ReqUpdateTaskParamDto } from './dto/UpdateTask.dto';
import { ReqDeleteTaskParamDto } from './dto/DeleteTask.dto';
import { getTasksLogsDocs } from './docs/GetTasksLogs.docs';
import { createTaskDocs } from './docs/CreateTask.docs';
import { updateTaskDocs } from './docs/UpdateTask.docs';
import { deleteTaskDocs } from './docs/DeleteTask.docs';
import { getTotalTaskPagesDocs } from './docs/GetTotalTaskPages.docs';
import {
  ReqGetTotalTaskPagesQueryDto,
  ResGetTotalTaskPagesDto,
} from './dto/GetTotalTaskPages.dto';
import { ProviderConstant } from '@shared/constants/Provider.constant';
import { plainToClass } from 'class-transformer';

@Controller('tasks')
@ApiTags('Task')
@ApiCookieAuth('accessToken')
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
export class TaskController {
  constructor(
    @Inject(ProviderConstant.ITASK_SERVICE)
    private readonly taskService: ITaskService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation(getTasksLogsDocs.operation)
  @ApiOkResponse(getTasksLogsDocs.okResponse)
  async getTasksLogs(
    @Req() req: Request,
    @Query() query: ReqGetTasksLogsQueryDto,
  ): Promise<ResGetTasksLogsDto[]> {
    const { taskType, offset, order, limit, completion } = query;
    const result = await this.taskService.getTasksLogs({
      userId: req.user.id,
      taskType,
      offset,
      limit,
      order,
      completion,
    });
    return result.map((item) => plainToClass(ResGetTasksLogsDto, item));
  }

  @Get('/count-pages')
  @HttpCode(HttpStatus.OK)
  @ApiOperation(getTotalTaskPagesDocs.operation)
  @ApiOkResponse(getTotalTaskPagesDocs.okResponse)
  async getTotalTaskPages(
    @Req() req: Request,
    @Query() query: ReqGetTotalTaskPagesQueryDto,
  ): Promise<ResGetTotalTaskPagesDto> {
    const userId = req.user.id;
    const { taskType, limit, completion } = query;
    return await this.taskService.getTotalTaskPages({
      userId,
      taskType,
      limit,
      completion,
    });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
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
  @HttpCode(HttpStatus.NO_CONTENT)
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation(deleteTaskDocs.operation)
  @ApiNoContentResponse(deleteTaskDocs.noContentResponse)
  async deleteTask(@Param() param: ReqDeleteTaskParamDto): Promise<void> {
    await this.taskService.deleteTask({ id: param.id });
  }
}
