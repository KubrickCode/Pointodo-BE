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

  async updateTaskLog(req: Partial<TasksLogsEntity>): Promise<TasksLogsEntity> {
    const { id, name, description, completion, importance } = req;
    const updateFields: string[] = [];
    const values: (number | string)[] = [];
    let placeholderIndex = 1;

    if (name) {
      updateFields.push(`name = $${placeholderIndex}`);
      values.push(name);
      placeholderIndex++;
    }

    if (description) {
      updateFields.push(`description = $${placeholderIndex}`);
      values.push(description);
      placeholderIndex++;
    }

    if (completion) {
      updateFields.push(`completion = $${placeholderIndex}`);
      values.push(completion);
      placeholderIndex++;
    }

    if (importance) {
      updateFields.push(`importance = $${placeholderIndex}`);
      values.push(importance);
      placeholderIndex++;
    }

    values.push(id);
    placeholderIndex++;

    const query = `
    UPDATE "TasksLogs"
    SET ${updateFields.join(', ')}
    WHERE id = $${placeholderIndex - 1}
    RETURNING *
  `;

    const updatedTaskLog = await this.prisma.$queryRawUnsafe<TasksLogs>(
      query,
      ...values,
    );
    return updatedTaskLog[0];
  }

  async deleteTaskLog(id: number): Promise<TasksLogsEntity> {
    const query = `
      DELETE FROM "TasksLogs"
      WHERE id = $1
      RETURNING *
    `;
    const values = [id];
    const deletedTaskLog = await this.prisma.$queryRawUnsafe<TasksLogs>(
      query,
      ...values,
    );
    return deletedTaskLog[0];
  }
}
