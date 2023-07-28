import { Controller, Inject } from '@nestjs/common';
import { ITaskService } from '../domain/interfaces/task.service.interface';

@Controller('task')
export class TaskController {
  constructor(
    @Inject('ITaskService')
    private readonly taskService: ITaskService,
  ) {}
}
