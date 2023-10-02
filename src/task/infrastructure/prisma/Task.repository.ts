import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/Prisma.service';
import { TransactionClient } from '@shared/types/Transaction.type';
import { TaskEntity, TaskType_ } from '@task/domain/entities/Task.entity';
import { TasksDueDateEntity } from '@task/domain/entities/TasksDueDate.entity';
import { ITaskRepository } from '@task/domain/interfaces/Task.repository.interface';
import { plainToClass } from 'class-transformer';
import { UUID } from 'crypto';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTasksLogs(
    userId: UUID,
    taskType: TaskType_,
    limit: number,
    offset: number,
    order: string,
    completion: string,
  ): Promise<TaskEntity[]> {
    let orderBy: object;
    const where = { userId, taskType };

    if (order === 'importance') orderBy = { importance: 'asc' };
    if (order === 'newest') orderBy = { occurredAt: 'desc' };
    if (order === 'old') orderBy = { occurredAt: 'asc' };
    if (order === 'name') orderBy = { name: 'asc' };

    if (completion === 'hide') Object.assign(where, { completion: 0 });

    if (taskType === 'DUE') {
      const result = await this.prisma.tasksLogs.findMany({
        where,
        include: { dueDate: true },
        orderBy,
        take: limit,
        skip: offset,
      });
      return result.map((item) =>
        plainToClass(TaskEntity, {
          ...item,
          dueDate: item.dueDate.dueDate,
        }),
      );
    } else {
      const result = await this.prisma.tasksLogs.findMany({
        where,
        orderBy,
        take: limit,
        skip: offset,
      });
      return result.map((item) => plainToClass(TaskEntity, item));
    }
  }

  async getTotalTaskPages(
    userId: UUID,
    taskType: TaskType_,
    completion: string,
  ): Promise<number> {
    const where = { userId, taskType };
    if (completion === 'hide') Object.assign(where, { completion: 0 });
    return await this.prisma.tasksLogs.count({ where });
  }

  async getTaskLogById(id: number): Promise<TaskEntity> {
    const result = await this.prisma.tasksLogs.findUnique({ where: { id } });
    return plainToClass(TaskEntity, result);
  }

  async createTask(
    userId: UUID,
    taskType: TaskType_,
    name: string,
    description: string,
    importance: number,
  ): Promise<TaskEntity> {
    const result = await this.prisma.tasksLogs.create({
      data: { userId, taskType, name, description, importance },
    });
    return plainToClass(TaskEntity, result);
  }

  async createTaskDueDate(
    id: number,
    date: string,
  ): Promise<TasksDueDateEntity> {
    const result = await this.prisma.tasksDueDate.create({
      data: { taskId: id, dueDate: date },
    });
    return plainToClass(TasksDueDateEntity, result);
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
        where: { taskId: id },
        data: { dueDate },
      });
    }

    return plainToClass(TaskEntity, updatedTaskLog);
  }

  async deleteTask(id: number): Promise<TaskEntity> {
    const result = await this.prisma.tasksLogs.delete({ where: { id } });
    return plainToClass(TaskEntity, result);
  }

  async deleteTaskDueDate(taskId: number): Promise<TasksDueDateEntity> {
    return await this.prisma.tasksDueDate.delete({ where: { taskId } });
  }

  async completeTask(id: number, tx?: TransactionClient): Promise<TaskEntity> {
    const prisma = tx ?? this.prisma;
    const result = prisma.tasksLogs.update({
      where: { id },
      data: {
        completion: { increment: 1 },
      },
    });
    return plainToClass(TaskEntity, result);
  }

  async cancleTaskCompletion(id: number): Promise<TaskEntity> {
    const result = await this.prisma.tasksLogs.update({
      where: { id },
      data: { completion: 0 },
    });
    return plainToClass(TaskEntity, result);
  }

  async resetDailyTask(): Promise<void> {
    await this.prisma.tasksLogs.updateMany({
      where: { taskType: 'DAILY' },
      data: { completion: 0, version: 0 },
    });
  }

  async lockTask(id: number, tx?: TransactionClient): Promise<void> {
    const prisma = tx ?? this.prisma;
    await prisma.tasksLogs.update({ where: { id }, data: { version: 1 } });
  }
}
