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
import { HandleDateTime } from '@shared/utils/handleDateTime';

@Injectable()
export class PointRepository implements IPointRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getEarnedPointsLogs(
    userId: string,
    limit: number,
    offset: number,
    order: string,
  ): Promise<EarnedPointWithTaskName[]> {
    let orderBy: string;

    if (order === 'newest') orderBy = '"occurredAt" DESC';
    if (order === 'old') orderBy = '"occurredAt" ASC';

    const query = `
    SELECT * FROM "EarnedPointsLogs"
    WHERE "userId" = $1::uuid
    ORDER BY p.${orderBy}
    LIMIT $2 OFFSET $3
    `;

    const values = [userId, limit, offset];

    const pointsLogs = await this.prisma.$queryRawUnsafe<
      EarnedPointWithTaskName[]
    >(query, ...values);

    return pointsLogs;
  }

  async getSpentPointsLogs(
    userId: string,
    limit: number,
    offset: number,
    order: string,
  ): Promise<SpentPointWithBadgeName[]> {
    let orderBy: string;

    if (order === 'newest') orderBy = '"occurredAt" DESC';
    if (order === 'old') orderBy = '"occurredAt" ASC';

    const query = `
    SELECT
      p.*,
      b."name" AS "badgeName"
    FROM "SpentPointsLogs" p
    INNER JOIN "Badge" b ON p."badgeId" = b.id
    WHERE p."userId" = $1::uuid
    ORDER BY p.${orderBy}
    LIMIT $2 OFFSET $3
    `;

    const values = [userId, limit, offset];

    const pointsLogs = await this.prisma.$queryRawUnsafe<
      SpentPointWithBadgeName[]
    >(query, ...values);

    return pointsLogs;
  }

  async getTotalPointPages(
    userId: string,
    transactionType: 'EARNED' | 'SPENT',
  ): Promise<number> {
    let query: string;
    if (transactionType === 'EARNED') {
      query = `
    SELECT COUNT(*) FROM "EarnedPointsLogs"
    WHERE "userId" = $1::uuid
    `;
    }
    if (transactionType === 'SPENT') {
      query = `
    SELECT COUNT(*) FROM "SpentPointsLogs"
    WHERE "userId" = $1::uuid
    `;
    }

    const values = [userId];
    const totalPointsLogs = await this.prisma.$queryRawUnsafe<{
      count: number;
    }>(query, ...values);
    return Number(totalPointsLogs[0].count);
  }

  async isContinuous(userId: string): Promise<boolean> {
    const isContinuousQuery = `
      SELECT COUNT(*) FROM "EarnedPointsLogs"
      WHERE "userId" = $1::uuid
      AND DATE("occurredAt") = DATE($2)
      `;

    const isContinuousValues = [userId, HandleDateTime.getYesterday];

    const isContinuous = await this.prisma.$queryRawUnsafe<[{ count: number }]>(
      isContinuousQuery,
      ...isContinuousValues,
    );

    return Number(isContinuous[0].count) > 0;
  }

  async createEarnedPointLog(
    taskId: number,
    userId: string,
    points: number,
  ): Promise<EarnedPointEntity> {
    const createPointLogQuery = `
        INSERT INTO "EarnedPointsLogs" ("taskId", "userId", points)
        VALUES ($1, $2::uuid, $3)
        RETURNING *
      `;

    const createPointLogValues = [taskId, userId, points];

    const createdPointLog = await this.prisma.$queryRawUnsafe<EarnedPointsLogs>(
      createPointLogQuery,
      ...createPointLogValues,
    );

    return createdPointLog[0];
  }

  async createSpentPointLog(
    badgeLogId: number,
    userId: string,
    points: number,
  ): Promise<SpentPointEntity> {
    const createPointLogQuery = `
        INSERT INTO "SpentPointsLogs" ("badgeId", "userId", points)
        VALUES ($1, $2::uuid, $3)
        RETURNING *
      `;

    const createPointLogValues = [badgeLogId, userId, points];

    const createdPointLog = await this.prisma.$queryRawUnsafe<SpentPointsLogs>(
      createPointLogQuery,
      ...createPointLogValues,
    );

    return createdPointLog[0];
  }

  async countTasksPerDate(userId: string, date: string): Promise<number> {
    const countTasksQuery = `
      SELECT COUNT(*) FROM "EarnedPointsLogs"
      WHERE "userId" = $1::uuid
      AND DATE("occurredAt") >= DATE($2)
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
