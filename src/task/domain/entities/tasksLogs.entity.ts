import { TasksLogs } from '@prisma/client';

export class TasksLogsEntity implements TasksLogs {
  id: number;
  userId: string;
  taskTypesId: number;
  name: string;
  description: string | null;
  completion: number;
  importance: number;
  occurredAt: Date;
}
