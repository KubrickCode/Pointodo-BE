import { TaskType, TasksLogs } from '@prisma/client';

export class TaskEntity implements TasksLogs {
  id: number;
  userId: string;
  taskType: TaskType_;
  name: string;
  description: string | null;
  completion: number;
  importance: number;
  occurredAt: Date;
  version: number;

  dueDate?: string;
}

type ReadonlyRecord<K extends string, V> = Readonly<Record<K, V>>;

export type TaskType_ = TaskType;
export const TaskTypes: ReadonlyRecord<TaskType_, TaskType_> = {
  DAILY: 'DAILY',
  DUE: 'DUE',
  FREE: 'FREE',
};
