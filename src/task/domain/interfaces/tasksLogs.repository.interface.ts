import { TasksLogsEntity } from '../entities/tasksLogs.entity';

export interface ITasksLogsRepository {
  createTaskLog(req: Partial<TasksLogsEntity>): Promise<TasksLogsEntity>;
}
