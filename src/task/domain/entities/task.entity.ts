import { TaskType, TasksLogs } from '@prisma/client';

export class TaskEntity implements TasksLogs {
  id: number;
  userId: string;
  taskType: TaskType;
  name: string;
  description: string | null;
  completion: number;
  importance: number;
  occurredAt: Date;
  version: number;

  dueDate?: string;
}
