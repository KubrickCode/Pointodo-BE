import { Injectable } from '@nestjs/common';
import { TasksDueDate, TasksLogs } from '@prisma/client';
import { PrismaService } from '@shared/service/prisma.service';
import { TaskEntity, TaskType_ } from '@task/domain/entities/task.entity';
import { TasksDueDateEntity } from '@task/domain/entities/tasksDueDate.entity';
import { ITaskRepository } from '@task/domain/interfaces/task.repository.interface';
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
    let query: string;
    let orderBy: string;

    if (order === 'importance') orderBy = 'importance ASC';
    if (order === 'newest') orderBy = '"occurredAt" DESC';
    if (order === 'old') orderBy = '"occurredAt" ASC';
    if (order === 'name') orderBy = 'name ASC';

    if (taskType === 'DUE') {
      query = `
            SELECT "TasksLogs".*, "TasksDueDate"."dueDate" 
            FROM "TasksLogs"
            LEFT JOIN "TasksDueDate" ON "TasksLogs".id = "TasksDueDate"."taskId"
            WHERE "TasksLogs"."userId" = $1::uuid ${
              completion === 'hide' ? 'AND "TasksLogs".completion = 0' : ''
            }
            AND "TasksLogs"."taskType" = $2::"TaskType"
            ORDER BY "TasksLogs".${orderBy}
            LIMIT $3 OFFSET $4
        `;
    } else {
      query = `
            SELECT * FROM "TasksLogs"
            WHERE "userId" = $1::uuid ${
              completion === 'hide' ? 'AND completion = 0' : ''
            }
            AND "taskType" = $2::"TaskType"
            ORDER BY ${orderBy}
            LIMIT $3 OFFSET $4
        `;
    }

    const values = [userId, taskType, limit, offset];
    const tasksLogs = await this.prisma.$queryRawUnsafe<TaskEntity[]>(
      query,
      ...values,
    );
    return tasksLogs;
  }

  async getTotalTaskPages(
    userId: UUID,
    taskType: TaskType_,
    completion: string,
  ): Promise<number> {
    const query = `
    SELECT COUNT(*)
    FROM "TasksLogs"
    WHERE "userId" = $1::uuid ${
      completion === 'hide' ? 'AND completion = 0' : ''
    }
    AND "taskType" = $2::"TaskType"
    `;

    const values = [userId, taskType];
    const totalTasks = await this.prisma.$queryRawUnsafe<{ count: number }>(
      query,
      ...values,
    );
    return Number(totalTasks[0].count);
  }

  async getTaskLogById(id: number): Promise<TaskEntity> {
    const query = `
      SELECT * FROM "TasksLogs"
      WHERE id = $1
    `;
    const values = [id];
    const taskLog = await this.prisma.$queryRawUnsafe<TasksLogs>(
      query,
      ...values,
    );
    return taskLog[0];
  }

  async createTask(
    userId: UUID,
    taskType: TaskType_,
    name: string,
    description: string,
    importance: number,
  ): Promise<TaskEntity> {
    const query = `
      INSERT INTO "TasksLogs" ("userId", "taskType", name, description, importance)
      VALUES ($1::uuid, $2::"TaskType", $3, $4 ,$5)
      RETURNING *
    `;
    const values = [userId, taskType, name, description, importance];
    const newTasksLogs = await this.prisma.$queryRawUnsafe<TasksLogs>(
      query,
      ...values,
    );
    return newTasksLogs[0];
  }

  async createTaskDueDate(
    id: number,
    date: string,
  ): Promise<TasksDueDateEntity> {
    const query = `
      INSERT INTO "TasksDueDate" ("taskId", "dueDate")
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [id, date];
    const result = await this.prisma.$queryRawUnsafe<TasksDueDate>(
      query,
      ...values,
    );
    return result[0];
  }

  async updateTask(
    id: number,
    name: string,
    description: string,
    importance: number,
    dueDate: string,
  ): Promise<TaskEntity> {
    const updateFields: string[] = [];
    const values: (number | string)[] = [];
    let placeholderIndex = 1;

    if (name) {
      updateFields.push(`name = $${placeholderIndex}`);
      values.push(name);
      placeholderIndex++;
    }

    if (description !== undefined) {
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

    if (dueDate) {
      const query = `
      UPDATE "TasksDueDate"
      SET "dueDate" = $1
      WHERE "taskId" = $2
      `;

      const values = [dueDate, id];

      await this.prisma.$queryRawUnsafe<void>(query, ...values);
    }

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

  async deleteTaskDueDate(taskId: number): Promise<TasksDueDateEntity> {
    const query = `
      DELETE FROM "TasksDueDate"
      WHERE "taskId" = $1
      RETURNING *
    `;
    const values = [taskId];
    const deletedTaskDueDate = await this.prisma.$queryRawUnsafe<TasksDueDate>(
      query,
      ...values,
    );
    return deletedTaskDueDate[0];
  }

  async completeTask(id: number, isRollback?: boolean): Promise<TaskEntity> {
    const completeQuery = `
        UPDATE "TasksLogs"
        SET completion = completion ${isRollback ? '- 1' : '+ 1'}
        WHERE id = $1
        RETURNING *
      `;
    const completeValues = [id];
    const completedTaskLog = await this.prisma.$queryRawUnsafe<TasksLogs>(
      completeQuery,
      ...completeValues,
    );

    return completedTaskLog[0];
  }

  async cancleTaskCompletion(id: number): Promise<TaskEntity> {
    const query = `
        UPDATE "TasksLogs"
        SET completion = completion - 1
        WHERE id = $1
        RETURNING *
      `;
    const values = [id];
    const cancledTask = await this.prisma.$queryRawUnsafe<TasksLogs>(
      query,
      ...values,
    );
    return cancledTask[0];
  }

  async resetDailyTask(): Promise<void> {
    const query = `
        UPDATE "TasksLogs"
        SET completion = 0, version = 0
        WHERE "taskType" = 'DAILY'
      `;
    await this.prisma.$queryRawUnsafe<TasksLogs>(query);
  }

  async lockTask(id: number): Promise<void> {
    const query = `
        UPDATE "TasksLogs"
        SET version = 1
        WHERE id = $1
      `;
    const values = [id];
    await this.prisma.$queryRawUnsafe<TasksLogs>(query, ...values);
  }
}
