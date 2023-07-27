import { TasksLogsEntity } from '../entities/tasksLogs.entity';

export interface ITasksLogsRepository {
  createTaskLog(req: Partial<TasksLogsEntity>): Promise<TasksLogsEntity>;
  updateTaskLog(req: Partial<TasksLogsEntity>): Promise<TasksLogsEntity>;
  deleteTaskLog(id: number): Promise<TasksLogsEntity>;
}
