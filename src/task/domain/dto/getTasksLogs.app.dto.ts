import { TaskType_ } from '../entities/task.entity';

export class ReqGetTasksLogsAppDto {
  readonly userId: string;
  readonly taskType: TaskType_;
  readonly page: number;
  readonly order: string;
}

export class ResGetTasksLogsAppDto {
  readonly id: number;
  readonly userId: string;
  readonly taskType: TaskType_;
  readonly name: string;
  readonly description: string;
  readonly completion: number;
  readonly importance: number;
  readonly occurredAt: Date;
  readonly dueDate?: string;
}
