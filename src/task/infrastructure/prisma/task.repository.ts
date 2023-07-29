import { Injectable } from '@nestjs/common';
import { PointsLogs, TasksLogs } from '@prisma/client';
import { PrismaService } from '@shared/service/prisma.service';
import { TaskEntity } from 'src/task/domain/entities/task.entity';
import { ITaskRepository } from 'src/task/domain/interfaces/task.repository.interface';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTasksLogs(
    userId: string,
    taskTypesId: number,
  ): Promise<TaskEntity[]> {
    const query = `
      SELECT * FROM "TasksLogs"
      WHERE "userId" = $1::uuid
      AND "taskTypesId" = $2
    `;
    const values = [userId, taskTypesId];
    const tasksLogs = await this.prisma.$queryRawUnsafe<TasksLogs[]>(
      query,
      ...values,
    );
    return tasksLogs;
  }

  async createTask(req: Partial<TaskEntity>): Promise<TaskEntity> {
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

  async updateTask(req: Partial<TaskEntity>): Promise<TaskEntity> {
    const { id, name, description, importance } = req;
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

    if (importance !== undefined) {
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

  async deleteTask(id: number): Promise<TaskEntity> {
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

  async completeTask(req: Partial<TaskEntity>): Promise<TaskEntity> {
    return await this.prisma.$transaction(async (tx) => {
      const completeQuery = `
        UPDATE "TasksLogs"
        SET completion = $1
        WHERE id = $2
        RETURNING *
      `;
      const completeValues = [req.id];
      return await tx.$queryRawUnsafe<TasksLogs>(
        completeQuery,
        ...completeValues,
      );

      const createPointLogQuery = `
        INSERT INTO "PointsLogs" ("userId", "pointTransactionTypesId", "taskTypesId", points)
        VALUES ($1::uuid, 0, $2, $3)
        RETURNING *
      `;

      let points: number;

      if (req.taskTypesId === 0) points = 1;
      if (req.taskTypesId === 1) points = 3;
      if (req.taskTypesId === 2) points = 5;

      const createPointLogValues = [req.userId, req.taskTypesId, points];

      await tx.$queryRawUnsafe<PointsLogs>(
        createPointLogQuery,
        ...createPointLogValues,
      );

      if (req.taskTypesId === 0) points = 1;
      if (req.taskTypesId === 1) points = 3;
      if (req.taskTypesId === 2) points = 5;
    });
  }
}
