import { Injectable } from '@nestjs/common';
import { PointsLogs, TasksLogs } from '@prisma/client';
import { PrismaService } from '@shared/service/prisma.service';
import { TaskEntity } from 'src/task/domain/entities/task.entity';
import { ITaskRepository } from 'src/task/domain/interfaces/task.repository.interface';
import { LocalDate } from 'js-joda';

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

  async completeTask(req: Partial<TaskEntity>): Promise<void> {
    return await this.prisma.$transaction(async (tx) => {
      const completeQuery = `
        UPDATE "TasksLogs"
        SET completion = 1
        WHERE id = $1
        RETURNING *
      `;
      const completeValues = [req.id];
      await tx.$queryRawUnsafe<TasksLogs>(completeQuery, ...completeValues);

      const today = LocalDate.now();

      const yesterday = today.minusDays(1).toString();

      const weekAgo = today.minusWeeks(1).toString();

      const monthAgo = today.minusMonths(1).toString();

      const isContinuousQuery = `
        SELECT COUNT(*) FROM "PointsLogs"
        WHERE "userId" = $1::uuid AND DATE("occurredAt") = DATE($2) AND "pointTransactionTypesId" = 0
      `;

      const isContinuousValues = [req.userId, yesterday];

      const isContinuous = await tx.$queryRawUnsafe<any>(
        isContinuousQuery,
        ...isContinuousValues,
      );

      const createPointLogQuery = `
        INSERT INTO "PointsLogs" ("userId", "pointTransactionTypesId", "taskTypesId", points)
        VALUES ($1::uuid, 0, $2, $3)
        RETURNING *
      `;

      let points: number;

      if (req.taskTypesId === 0)
        points = Number(isContinuous[0].count) > 0 ? 2 : 1;
      if (req.taskTypesId === 1)
        points = Number(isContinuous[0].count) > 0 ? 4 : 3;
      if (req.taskTypesId === 2)
        points = Number(isContinuous[0].count) > 0 ? 6 : 5;

      const createPointLogValues = [req.userId, req.taskTypesId, points];

      await tx.$queryRawUnsafe<PointsLogs>(
        createPointLogQuery,
        ...createPointLogValues,
      );

      const updateConsistencyQuery = `
        UPDATE "BadgeProgress"
        SET progress = progress + 1
        WHERE "userId" = $1::uuid AND "badgeId" = 3
      `;

      const resetConsistencyQuery = `
        UPDATE "BadgeProgress"
        SET progress = 1
        WHERE "userId" = $1::uuid AND "badgeId" = 3
      `;

      const consistencyValues = [req.userId];

      if (Number(isContinuous[0].count) > 0) {
        await tx.$queryRawUnsafe<any>(
          updateConsistencyQuery,
          ...consistencyValues,
        );
      } else {
        await tx.$queryRawUnsafe<any>(
          resetConsistencyQuery,
          ...consistencyValues,
        );
      }

      const diversityQuery = `
          UPDATE "BadgeProgress"
          SET progress = progress + 1
          WHERE "userId" = $1::uuid AND "badgeId" = $2
        `;

      const diversityValues: [string, number] = [req.userId, 0];

      if (req.taskTypesId === 0) {
        diversityValues[1] = 4;
      }
      if (req.taskTypesId === 1) {
        diversityValues[1] = 5;
      }
      if (req.taskTypesId === 2) {
        diversityValues[1] = 6;
      }

      await tx.$queryRawUnsafe<any>(diversityQuery, ...diversityValues);

      const todayTasksQuery = `
        SELECT COUNT(*) FROM "PointsLogs"
        WHERE "userId" = $1::uuid AND DATE("occurredAt") = DATE($2) AND "pointTransactionTypesId" = 0
      `;

      const weekAndMonthAgoTasksQuery = `
        SELECT COUNT(*) FROM "PointsLogs"
        WHERE "userId" = $1::uuid AND DATE("occurredAt") >= DATE($2) AND "pointTransactionTypesId" = 0
      `;

      const todayTasksValues = [req.userId, today];
      const weekAgoTasksValues = [req.userId, weekAgo];
      const monthAgoTasksValues = [req.userId, monthAgo];

      const todayTasksCount = await tx.$queryRawUnsafe<number>(
        todayTasksQuery,
        ...todayTasksValues,
      );

      const weekTasksCount = await tx.$queryRawUnsafe<number>(
        weekAndMonthAgoTasksQuery,
        ...weekAgoTasksValues,
      );

      const monthTasksCount = await tx.$queryRawUnsafe<number>(
        weekAndMonthAgoTasksQuery,
        ...monthAgoTasksValues,
      );

      const productivityQuery = `
        UPDATE "BadgeProgress"
        SET progress = $1
        WHERE "userId" = $2::uuid AND "badgeId" = $3
      `;

      const productivityTodayValues = [
        Number(todayTasksCount[0].count),
        req.userId,
        7,
      ];
      const productivityWeekValues = [
        Number(weekTasksCount[0].count),
        req.userId,
        8,
      ];
      const productivityMonthValues = [
        Number(monthTasksCount[0].count),
        req.userId,
        9,
      ];

      await tx.$queryRawUnsafe<any>(
        productivityQuery,
        ...productivityTodayValues,
      );
      await tx.$queryRawUnsafe<any>(
        productivityQuery,
        ...productivityWeekValues,
      );
      await tx.$queryRawUnsafe<any>(
        productivityQuery,
        ...productivityMonthValues,
      );
    });
  }
}
