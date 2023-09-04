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
import { ITaskService } from '../domain/interfaces/task.service.interface';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
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
import { ITASK_SERVICE } from '@shared/constants/provider.constant';
import { plainToClass } from 'class-transformer';

@Controller('tasks')
@ApiTags('Task')
@ApiCookieAuth('accessToken')
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
export class TaskController {
  constructor(
    @Inject(ITASK_SERVICE)
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
    const { taskType, offset, order, limit } = query;
    const result = await this.taskService.getTasksLogs({
      userId: req.user.id,
      taskType,
      offset,
      limit,
      order,
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
    const { taskType, limit } = query;
    return await this.taskService.getTotalTaskPages({
      userId,
      taskType,
      limit,
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
