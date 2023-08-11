import { TaskType_ } from '../entities/task.entity';

export class ReqGetTotalPagesAppDto {
  readonly userId: string;
  readonly taskType: TaskType_;
}

export class ResGetTotalPagesAppDto {
  readonly totalPages: number;
}
