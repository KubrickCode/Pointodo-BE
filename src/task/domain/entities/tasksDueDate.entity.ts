import { TasksDueDate } from '@prisma/client';

export class TasksDueDateEntity implements TasksDueDate {
  id: number;
  taskId: number;
  dueDate: Date;
}
