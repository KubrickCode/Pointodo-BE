import { TaskType, TasksLogs } from '@prisma/client';
import { Expose } from 'class-transformer';
import { UUID } from 'crypto';

export class TaskEntity implements TasksLogs {
  @Expose() readonly id: number;
  @Expose() readonly userId: UUID;
  @Expose() readonly taskType: TaskType_;
  @Expose() readonly name: string;
  @Expose() readonly description: string | null;
  @Expose() readonly completion: number;
  @Expose() readonly importance: number;
  @Expose() readonly occurredAt: Date;
  @Expose() readonly dueDate?: string;
  @Expose() readonly version: number;
}

type ReadonlyRecord<K extends string, V> = Readonly<Record<K, V>>;

export type TaskType_ = TaskType;
export const TaskTypes: ReadonlyRecord<TaskType_, TaskType_> = {
  DAILY: 'DAILY',
  DUE: 'DUE',
  FREE: 'FREE',
};
