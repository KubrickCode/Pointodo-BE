import { UUID } from 'crypto';
import { TaskType_ } from '../entities/task.entity';

export class ReqGetTotalTaskPagesAppDto {
  readonly userId: UUID;
  readonly taskType: TaskType_;
}

export class ResGetTotalTaskPagesAppDto {
  readonly totalPages: number;
}
