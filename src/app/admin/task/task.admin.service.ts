import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { ITaskAdminService } from '@domain/admin/task/interfaces/task.admin.service.interface';
import { ITaskAdminRepository } from '@domain/admin/task/interfaces/task.admin.repository.interface';
import {
  ReqCreateTaskTypeAppDto,
  ResCreateTaskTypeAppDto,
} from '@domain/admin/task/dto/createTaskType.app.dto';
import {
  ReqUpdateTaskTypeAppDto,
  ResUpdateTaskTypeAppDto,
} from '@domain/admin/task/dto/updateTaskType.app.dto';
import { ResDeleteTaskTypeAppDto } from '@domain/admin/task/dto/deleteTaskType.app.dto';
import {
  CREATE_TASK_TYPE_SUCCESS_MESSAGE,
  DELETE_TASK_TYPE_SUCCESS_MESSAGE,
  UPDATE_TASK_TYPE_SUCCESS_MESSAGE,
} from '@shared/messages/admin/task.admin.message';
import { TaskTypesEntity } from '@domain/admin/task/entities/taskTypes.entity';

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
    const { id, name } = req;
    const isExist = await this.taskAdminRepository.isExist({ id, name });
    if (isExist) throw new ConflictException('이미 존재하는 ID 혹은 작업 이름');
    const createdTaskType = await this.taskAdminRepository.create(req);
    this.logger.log(
      'info',
      `생성 작업 타입 ID:${createdTaskType.id}, 작업명:${createdTaskType.name}`,
    );
    return { message: CREATE_TASK_TYPE_SUCCESS_MESSAGE };
  }

  async updateTaskType(
    req: ReqUpdateTaskTypeAppDto,
  ): Promise<ResUpdateTaskTypeAppDto> {
    const { newId, name } = req;
    const isExist = await this.taskAdminRepository.isExist({
      id: newId,
      name,
    });
    if (isExist) throw new ConflictException('이미 존재하는 ID 혹은 작업 이름');
    const updatedTaskType = await this.taskAdminRepository.update(req);
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
