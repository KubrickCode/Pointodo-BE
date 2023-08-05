import { TasksLogs } from '@prisma/client';

export class TaskEntity implements TasksLogs {
  id: number;
  userId: string;
  taskType: string;
  name: string;
  description: string | null;
  completion: number;
  importance: number;
  occurredAt: Date;
}
