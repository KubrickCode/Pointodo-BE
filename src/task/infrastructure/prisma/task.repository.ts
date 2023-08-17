import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/prisma.service';
import { TaskEntity, TaskType_ } from '@task/domain/entities/task.entity';
import { TasksDueDateEntity } from '@task/domain/entities/tasksDueDate.entity';
import { ITaskRepository } from '@task/domain/interfaces/task.repository.interface';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTasksLogs(
    userId: string,
    taskType: TaskType_,
    limit: number,
    offset: number,
    order: string,
  ): Promise<TaskEntity[]> {
    let orderBy: object;

    if (order === 'importance') orderBy = { importance: 'asc' };
    if (order === 'newest') orderBy = { occurredAt: 'desc' };
    if (order === 'old') orderBy = { occurredAt: 'asc' };
    if (order === 'name') orderBy = { name: 'asc' };

    if (taskType === 'DUE') {
      const result = await this.prisma.tasksLogs.findMany({
        where: { userId, taskType },
        include: { dueDate: true },
        orderBy,
        take: limit,
        skip: offset,
      });
      return result.map((item) => ({
        ...item,
        dueDate: item.dueDate.dueDate,
      }));
    } else {
      return await this.prisma.tasksLogs.findMany({
        where: { userId, taskType },
        orderBy,
        take: limit,
        skip: offset,
      });
    }
  }

  async getTotalTaskPages(
    userId: string,
    taskType: TaskType_,
  ): Promise<number> {
    return await this.prisma.tasksLogs.count({ where: { userId, taskType } });
  }

  async getTaskLogById(id: number): Promise<TaskEntity> {
    return await this.prisma.tasksLogs.findUnique({ where: { id } });
  }

  async createTask(
    userId: string,
    taskType: TaskType_,
    name: string,
    description: string,
    importance: number,
  ): Promise<TaskEntity> {
    return await this.prisma.tasksLogs.create({
      data: { userId, taskType, name, description, importance },
    });
  }

  async createTaskDueDate(
    id: number,
    date: string,
  ): Promise<TasksDueDateEntity> {
    return await this.prisma.tasksDueDate.create({
      data: { taskId: id, dueDate: date },
    });
  }

  async updateTask(
    id: number,
    name: string,
    description: string,
    importance: number,
    dueDate: string,
  ): Promise<TaskEntity> {
    const data: object = {};

    if (name) {
      Object.assign(data, { name });
    }

    if (description !== undefined) {
      Object.assign(data, { description });
    }

    if (importance !== undefined) {
      Object.assign(data, { importance });
    }

    const updatedTaskLog = await this.prisma.tasksLogs.update({
      where: { id },
      data,
    });

    if (dueDate) {
      await this.prisma.tasksDueDate.update({
        where: { id },
        data: { dueDate },
      });
    }

    return updatedTaskLog;
  }

  async deleteTask(id: number): Promise<TaskEntity> {
    return await this.prisma.tasksLogs.delete({ where: { id } });
  }

  async deleteTaskDueDate(taskId: number): Promise<TasksDueDateEntity> {
    return await this.prisma.tasksDueDate.delete({ where: { taskId } });
  }

  async completeTask(id: number, isRollback?: boolean): Promise<TaskEntity> {
    return this.prisma.tasksLogs.update({
      where: { id },
      data: {
        completion: isRollback ? { increment: 1 } : { decrement: 1 },
      },
    });
  }

  async cancleTaskCompletion(id: number): Promise<TaskEntity> {
    return await this.prisma.tasksLogs.update({
      where: { id },
      data: { completion: { decrement: 1 } },
    });
  }

  async resetDailyTask(): Promise<void> {
    await this.prisma.tasksLogs.updateMany({
      where: { taskType: 'DAILY' },
      data: { completion: 0, version: 0 },
    });
  }

  async lockTask(id: number): Promise<void> {
    await this.prisma.tasksLogs.update({ where: { id }, data: { version: 1 } });
  }
}
