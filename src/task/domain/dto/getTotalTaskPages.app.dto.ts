import { UUID } from 'crypto';
import { TaskType_ } from '../entities/task.entity';

export class ReqGetTotalTaskPagesAppDto {
  readonly userId: UUID;
  readonly taskType: TaskType_;
  readonly limit: number;
  readonly completion: string;
}

export class ResGetTotalTaskPagesAppDto {
  readonly totalPages: number;
}
