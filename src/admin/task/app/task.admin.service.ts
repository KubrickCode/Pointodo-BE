import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { ITaskAdminService } from '@admin/task/domain/entities/task.admin.service.interface';
import { ITaskAdminRepository } from '@admin/task/domain/interfaces/task.admin.repository.interface';
import {
  ReqCreateTaskTypeAppDto,
  ResCreateTaskTypeAppDto,
} from '@admin/task/domain/dto/createTaskType.app.dto';
import {
  ReqUpdateTaskTypeAppDto,
  ResUpdateTaskTypeAppDto,
} from '@admin/task/domain/dto/updateTaskType.app.dto';
import { ResDeleteTaskTypeAppDto } from '@admin/task/domain/dto/deleteTaskType.app.dto';
import {
  CREATE_TASK_TYPE_SUCCESS_MESSAGE,
  DELETE_TASK_TYPE_SUCCESS_MESSAGE,
  UPDATE_TASK_TYPE_SUCCESS_MESSAGE,
} from '@shared/messages/admin/task.admin.message';
import { TaskTypesEntity } from '@admin/task/domain/entities/taskTypes.entity';
import { CONFLICT_TASK_TYPE_NAME } from '@shared/messages/admin/task.admin.errors';

@Injectable()
export class TaskAdminService implements ITaskAdminService {
  constructor(
    @Inject('ITaskAdminRepository')
    private readonly taskAdminRepository: ITaskAdminRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async getAllTaskTypes(): Promise<TaskTypesEntity[]> {
    return await this.taskAdminRepository.getAllTaskTypes();
  }

  async createTaskType(
    req: ReqCreateTaskTypeAppDto,
  ): Promise<ResCreateTaskTypeAppDto> {
    const isExist = await this.taskAdminRepository.isExist(req.name);
    if (isExist) throw new ConflictException(CONFLICT_TASK_TYPE_NAME);
    const createdTaskType = await this.taskAdminRepository.create(req.name);
    this.logger.log(
      'info',
      `생성 작업 타입 ID:${createdTaskType.id}, 작업명:${createdTaskType.name}`,
    );
    return { message: CREATE_TASK_TYPE_SUCCESS_MESSAGE };
  }

  async updateTaskType(
    req: ReqUpdateTaskTypeAppDto,
  ): Promise<ResUpdateTaskTypeAppDto> {
    const isExist = await this.taskAdminRepository.isExist(req.name);
    if (isExist) throw new ConflictException(CONFLICT_TASK_TYPE_NAME);
    const updatedTaskType = await this.taskAdminRepository.update(
      req.id,
      req.name,
    );
    this.logger.log(
      'info',
      `업데이트 작업 타입 ID:${updatedTaskType.id}, 작업명:${updatedTaskType.name}`,
    );
    return { message: UPDATE_TASK_TYPE_SUCCESS_MESSAGE };
  }

  async deleteTaskType(id: number): Promise<ResDeleteTaskTypeAppDto> {
    const deletedTaskType = await this.taskAdminRepository.delete(id);
    this.logger.log('info', `삭제 작업 타입 ID:${deletedTaskType.id}`);
    return { message: DELETE_TASK_TYPE_SUCCESS_MESSAGE };
  }
}
