import { TaskType_ } from '../entities/task.entity';

export class ReqGetTotalTaskPagesAppDto {
  readonly userId: string;
  readonly taskType: TaskType_;
}

export class ResGetTotalTaskPagesAppDto {
  readonly totalPages: number;
}
