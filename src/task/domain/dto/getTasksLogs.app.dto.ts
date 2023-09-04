import { UUID } from 'crypto';
import {
  TASK_ORDER_TYPE,
  TASK_VISIBLE_BY_COMPLETION_TYPE,
  TaskEntity,
  TaskType_,
} from '../entities/task.entity';
import { Exclude } from 'class-transformer';

export class ReqGetTasksLogsAppDto {
  readonly userId: UUID;
  readonly taskType: TaskType_;
  readonly offset: number;
  readonly limit: number;
  readonly order: TASK_ORDER_TYPE;
  readonly completion: TASK_VISIBLE_BY_COMPLETION_TYPE;
}

export class ResGetTasksLogsAppDto extends TaskEntity {
  @Exclude() readonly version: number;
  @Exclude() readonly userId: UUID;
}
