import { Injectable } from '@nestjs/common';
import { EarnedPointsLogs, SpentPointsLogs } from '@prisma/client';
import { PrismaService } from '@shared/service/prisma.service';
import {
  EarnedPointEntity,
  EarnedPointWithTaskName,
} from '@point/domain/entities/earnedPoint.entity';
import { IPointRepository } from 'src/point/domain/interfaces/point.repository.interface';
import {
  SpentPointEntity,
  SpentPointWithBadgeName,
} from '@point/domain/entities/spentPoint.entity';

@Injectable()
export class PointRepository implements IPointRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getEarnedPointsLogs(
    userId: string,
  ): Promise<EarnedPointWithTaskName[]> {
    const query = `
    SELECT p.*, t.name as "taskName"
    FROM "EarnedPointsLogs" as p
    LEFT JOIN "TasksLogs" as t
    ON p."taskId" = t.id
    WHERE p."userId" = $1::uuid
    `;

    const values = [userId];

    const pointsLogs = await this.prisma.$queryRawUnsafe<
      EarnedPointWithTaskName[]
    >(query, ...values);

    return pointsLogs;
  }

  async getSpentPointsLogs(userId: string): Promise<SpentPointWithBadgeName[]> {
    const query = `
    SELECT p.*, b.name as "badgeName"
    FROM "SpentPointsLogs" as p
    LEFT JOIN "Badge" as b
    ON p."badgeId" = b.id
    WHERE p."userId" = $1::uuid
    `;

    const values = [userId];

    const pointsLogs = await this.prisma.$queryRawUnsafe<
      SpentPointWithBadgeName[]
    >(query, ...values);

    return pointsLogs;
  }

  async isContinuous(userId: string, yesterday: string): Promise<boolean> {
    const isContinuousQuery = `
        SELECT COUNT(*) FROM "EarnedPointsLogs"
        WHERE "userId" = $1::uuid AND DATE("occurredAt") = DATE($2)
      `;

    const isContinuousValues = [userId, yesterday];

    const isContinuous = await this.prisma.$queryRawUnsafe<[{ count: number }]>(
      isContinuousQuery,
      ...isContinuousValues,
    );

    return Number(isContinuous[0].count) > 0;
  }

  async createEarnedPointLog(
    userId: string,
    taskId: number,
    points: number,
  ): Promise<EarnedPointEntity> {
    const createPointLogQuery = `
        INSERT INTO "EarnedPointsLogs" ("userId", "taskId", points)
        VALUES ($1::uuid, $2, $3)
        RETURNING *
      `;

    const createPointLogValues = [userId, taskId, points];

    const createdPointLog = await this.prisma.$queryRawUnsafe<EarnedPointsLogs>(
      createPointLogQuery,
      ...createPointLogValues,
    );

    return createdPointLog[0];
  }

  async createSpentPointLog(
    userId: string,
    badgeId: number,
    points: number,
  ): Promise<SpentPointEntity> {
    const createPointLogQuery = `
        INSERT INTO "SpentPointsLogs" ("userId", "badgeId", points)
        VALUES ($1::uuid, $2, $3)
        RETURNING *
      `;

    const createPointLogValues = [userId, badgeId, points];

    const createdPointLog = await this.prisma.$queryRawUnsafe<SpentPointsLogs>(
      createPointLogQuery,
      ...createPointLogValues,
    );

    return createdPointLog[0];
  }

  async countTasksPerDate(userId: string, date: string): Promise<number> {
    const countTasksQuery = `
        SELECT COUNT(*) FROM "EarnedPointsLogs"
        WHERE "userId" = $1::uuid AND DATE("occurredAt") >= DATE($2)
      `;

    const countTasksValues = [userId, date];

    const tasksCount = await this.prisma.$queryRawUnsafe<[{ count: number }]>(
      countTasksQuery,
      ...countTasksValues,
    );

    return Number(tasksCount[0].count);
  }

  async calculateUserPoints(userId: string): Promise<number> {
    const earnedPointsQuery = `
        SELECT SUM(points) AS "earnedPoints" FROM "EarnedPointsLogs"
        WHERE "userId" = $1::uuid
      `;

    const earnedPoints = await this.prisma.$queryRawUnsafe<number>(
      earnedPointsQuery,
      userId,
    );

    const spentPointsQuery = `
        SELECT SUM(points) AS "spentPoints" FROM "SpentPointsLogs"
        WHERE "userId" = $1::uuid
      `;

    const spentPoints = await this.prisma.$queryRawUnsafe<number>(
      spentPointsQuery,
      userId,
    );

    const totalEarnedPoints = Number(earnedPoints[0].earnedPoints) || 0;
    const totalSpentPoints = Number(spentPoints[0].spentPoints) || 0;

    const userTotalPoints = totalEarnedPoints - totalSpentPoints;

    return userTotalPoints;
  }

  async deleteEarnedPointLog(id: number): Promise<EarnedPointEntity> {
    const query = `
    DELETE FROM "EarnedPointsLogs"
    WHERE id = $1
    RETURNING *
    `;

    const deletedLog = await this.prisma.$queryRawUnsafe<number>(query, id);

    return deletedLog[0];
  }

  async deleteSpentPointLog(id: number): Promise<SpentPointEntity> {
    const query = `
    DELETE FROM "SpentPointsLogs"
    WHERE id = $1
    RETURNING *
    `;

    const deletedLog = await this.prisma.$queryRawUnsafe<number>(query, id);

    return deletedLog[0];
  }
}
