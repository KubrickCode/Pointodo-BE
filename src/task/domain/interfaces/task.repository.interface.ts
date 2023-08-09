import { TaskEntity } from '../entities/task.entity';
import { TasksDueDateEntity } from '../entities/tasksDueDate.entity';

export interface ITaskRepository {
  getTasksLogs(userId: string, taskType: string): Promise<TaskEntity[]>;
  getTaskLogById(id: number): Promise<TaskEntity>;
  createTask(
    userId: string,
    taskType: string,
    name: string,
    description: string,
    importance: number,
  ): Promise<TaskEntity>;

  createTaskDueDate(id: number, date: string): Promise<TasksDueDateEntity>;

  updateTask(
    id: number,
    name?: string,
    description?: string,
    importance?: number,
    dueDate?: string,
  ): Promise<TaskEntity>;

  deleteTask(id: number): Promise<TaskEntity>;
  deleteTaskDueDate(taskId: number): Promise<TasksDueDateEntity>;

  completeTask(id: number, isRollback?: boolean): Promise<TaskEntity>;
  cancleTaskCompletion(id: number): Promise<TaskEntity>;
  lockTask(id: number): Promise<void>;
}
