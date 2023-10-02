import { UUID } from 'crypto';
import {
  TASK_VISIBLE_BY_COMPLETION_TYPE,
  TaskType_,
} from '../entities/Task.entity';

export class ReqGetTotalTaskPagesAppDto {
  readonly userId: UUID;
  readonly taskType: TaskType_;
  readonly limit: number;
  readonly completion: TASK_VISIBLE_BY_COMPLETION_TYPE;
}

export class ResGetTotalTaskPagesAppDto {
  readonly totalPages: number;
}
