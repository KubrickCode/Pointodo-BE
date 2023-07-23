import {
  Controller,
  UseGuards,
  Inject,
  Body,
  Post,
  Param,
  Delete,
  Patch,
  Get,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from '@infrastructure/auth/passport/guards/jwt.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdminAuthGuard } from '@infrastructure/auth/passport/guards/admin.guard';
import { globalDocs } from '@interface/docs/global/global.docs';
import { adminDocs } from '@interface/docs/admin/admin.docs';
import { ITaskAdminService } from '@domain/admin/task/interfaces/task.admin.service.interface';
import { getAllTaskTypesDocs } from '@interface/docs/admin/task/getAllTaskTypes.admin.docs';
import { createTaskTypeDocs } from '@interface/docs/admin/task/createTaskType.admin.docs';
import { updateTaskTypeDocs } from '@interface/docs/admin/task/updateTaskType.admin.docs';
import { deleteTaskTypeDocs } from '@interface/docs/admin/task/deleteTaskType.admin.docs';
import { ResGetAllTaskTypesDto } from '@interface/dto/admin/task/getAllTaskTypes.dto';
import {
  ReqCreateTaskTypeDto,
  ResCreateTaskTypeDto,
} from '@interface/dto/admin/task/createTaskType.dto';
import {
  ReqUpdateTaskTypeDto,
  ReqUpdateTaskTypeParamDto,
  ResUpdateTaskTypeDto,
} from '@interface/dto/admin/task/updateTaskType.dto';
import {
  ReqDeleteTaskTypeParamDto,
  ResDeleteTaskTypeDto,
} from '@interface/dto/admin/task/deleteTaskType.dto';

@ApiTags('Admin - Task')
@ApiBearerAuth()
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
@ApiForbiddenResponse(adminDocs.forbidden)
@Controller('/admin/task')
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class TaskAdminController {
  constructor(
    @Inject('ITaskAdminService')
    private readonly taskAdminService: ITaskAdminService,
  ) {}

  @Get('/all')
  @HttpCode(200)
  @ApiOperation(getAllTaskTypesDocs.operation)
  @ApiOkResponse(getAllTaskTypesDocs.okResponse)
  async getAllTaskTypes(): Promise<ResGetAllTaskTypesDto[]> {
    return await this.taskAdminService.getAllTaskTypes();
  }

  @Post('/create')
  @HttpCode(201)
  @ApiOperation(createTaskTypeDocs.operation)
  @ApiOkResponse(createTaskTypeDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  @ApiConflictResponse(createTaskTypeDocs.conflict)
  async createTaskType(
    @Body() body: ReqCreateTaskTypeDto,
  ): Promise<ResCreateTaskTypeDto> {
    return await this.taskAdminService.createTaskType(body);
  }

  @Patch('/update/:id')
  @HttpCode(201)
  @ApiOperation(updateTaskTypeDocs.operation)
  @ApiOkResponse(updateTaskTypeDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  @ApiConflictResponse(updateTaskTypeDocs.conflict)
  async updateTaskType(
    @Body() body: ReqUpdateTaskTypeDto,
    @Param() param: ReqUpdateTaskTypeParamDto,
  ): Promise<ResUpdateTaskTypeDto> {
    return await this.taskAdminService.updateTaskType({
      ...body,
      id: param.id,
    });
  }

  @Delete('/delete/:id')
  @HttpCode(200)
  @ApiOperation(deleteTaskTypeDocs.operation)
  @ApiOkResponse(deleteTaskTypeDocs.okResponse)
  async deleteTaskType(
    @Param() param: ReqDeleteTaskTypeParamDto,
  ): Promise<ResDeleteTaskTypeDto> {
    return await this.taskAdminService.deleteTaskType(param.id);
  }
}
