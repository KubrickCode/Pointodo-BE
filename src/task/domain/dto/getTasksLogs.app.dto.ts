import { UUID } from 'crypto';
import { TaskEntity, TaskType_ } from '../entities/task.entity';
import { Exclude } from 'class-transformer';

export class ReqGetTasksLogsAppDto {
  readonly userId: UUID;
  readonly taskType: TaskType_;
  readonly offset: number;
  readonly limit: number;
  readonly order: string;
}

export class ResGetTasksLogsAppDto extends TaskEntity {
  @Exclude() readonly version: number;
  @Exclude() readonly userId: UUID;
}
