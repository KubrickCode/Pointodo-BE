import { TaskEntity } from '../entities/task.entity';

export interface ITaskRepository {
  getTasksLogs(userId: string, taskType: string): Promise<TaskEntity[]>;
  getTaskLogById(id: number): Promise<TaskEntity>;
  createTask(req: Partial<TaskEntity>): Promise<TaskEntity>;
  updateTask(req: Partial<TaskEntity>): Promise<TaskEntity>;
  deleteTask(id: number): Promise<TaskEntity>;
  completeTask(id: number): Promise<TaskEntity>;
}
