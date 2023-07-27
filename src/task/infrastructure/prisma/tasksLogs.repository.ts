import { Injectable } from '@nestjs/common';
import { TasksLogs } from '@prisma/client';
import { PrismaService } from '@shared/service/prisma.service';
import { TasksLogsEntity } from 'src/task/domain/entities/tasksLogs.entity';
import { ITasksLogsRepository } from 'src/task/domain/interfaces/tasksLogs.repository.interface';

@Injectable()
export class TasksLogsRepository implements ITasksLogsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTaskLog(req: Partial<TasksLogsEntity>): Promise<TasksLogsEntity> {
    const { userId, taskTypesId, name, description } = req;
    const query = `
      INSERT INTO "TasksLogs" ("userId", "taskTypesId", name, description)
      VALUES ($1::uuid, $2, $3, $4)
      RETURNING *
    `;
    const values = [userId, taskTypesId, name, description];
    const newTasksLogs = await this.prisma.$queryRawUnsafe<TasksLogs>(
      query,
      ...values,
    );
    return newTasksLogs[0];
  }
}
