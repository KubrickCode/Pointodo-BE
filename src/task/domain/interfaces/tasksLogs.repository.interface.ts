import { TasksLogsEntity } from '../entities/tasksLogs.entity';

export interface ITasksLogsRepository {
  createTaskLogs(req: Partial<TasksLogsEntity>): Promise<TasksLogsEntity>;
}
