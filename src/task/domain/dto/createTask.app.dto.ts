import { TaskType_ } from '../entities/task.entity';

export class ReqCreateTaskAppDto {
  readonly userId: string;
  readonly taskType: TaskType_;
  readonly name: string;
  readonly description?: string;
  readonly importance: number;
  readonly dueDate?: string;
}

export class ResCreateTaskAppDto {
  readonly message: string;
}
