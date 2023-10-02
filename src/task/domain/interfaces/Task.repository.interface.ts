import { UUID } from 'crypto';
import {
  TASK_VISIBLE_BY_COMPLETION_TYPE,
  TaskEntity,
  TaskType_,
} from '../entities/Task.entity';
import { TasksDueDateEntity } from '../entities/TasksDueDate.entity';
import { TransactionClient } from '@shared/types/Transaction.type';

export interface ITaskRepository {
  getTasksLogs(
    userId: UUID,
    taskType: TaskType_,
    limit: number,
    offset: number,
    order: string,
    completion: TASK_VISIBLE_BY_COMPLETION_TYPE,
  ): Promise<TaskEntity[]>;

  getTotalTaskPages(
    userId: UUID,
    taskType: TaskType_,
    completion: TASK_VISIBLE_BY_COMPLETION_TYPE,
  ): Promise<number>;

  getTaskLogById(id: number): Promise<TaskEntity>;

  createTask(
    userId: UUID,
    taskType: TaskType_,
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

  completeTask(id: number, tx?: TransactionClient): Promise<TaskEntity>;

  cancleTaskCompletion(id: number): Promise<TaskEntity>;

  resetDailyTask(): Promise<void>;

  lockTask(id: number, tx?: TransactionClient): Promise<void>;
}
