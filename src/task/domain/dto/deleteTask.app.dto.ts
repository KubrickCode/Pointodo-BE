import { TaskType_ } from '../entities/task.entity';

export class ReqDeleteTaskAppDto {
  readonly id: number;
  readonly taskType: TaskType_;
}

export class ResDeleteTaskAppDto {
  readonly message: string;
}
