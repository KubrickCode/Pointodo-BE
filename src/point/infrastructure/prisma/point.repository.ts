import { Injectable } from '@nestjs/common';
import { PointsLogs } from '@prisma/client';
import { PrismaService } from '@shared/service/prisma.service';
import { PointEntity } from 'src/point/domain/entities/point.entity';
import { IPointRepository } from 'src/point/domain/interfaces/point.repository.interface';

@Injectable()
export class PointRepository implements IPointRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPointsLogs(userId: string): Promise<PointEntity[]> {
    const query = `
    SELECT * FROM "PointsLogs"
    WHERE "userId" = $1
    `;

    const values = [userId];

    const pointsLogs = await this.prisma.$queryRawUnsafe<PointsLogs[]>(
      query,
      ...values,
    );

    return pointsLogs;
  }

  async isContinuous(userId: string, yesterday: string): Promise<boolean> {
    const isContinuousQuery = `
        SELECT COUNT(*) FROM "PointsLogs"
        WHERE "userId" = $1::uuid AND DATE("occurredAt") = DATE($2) AND "transactionType" = 'EARNED'
      `;

    const isContinuousValues = [userId, yesterday];

    const isContinuous = await this.prisma.$queryRawUnsafe<[{ count: number }]>(
      isContinuousQuery,
      ...isContinuousValues,
    );

    return Number(isContinuous[0].count) > 0;
  }

  async createPointLog(
    userId: string,
    transactionType: string,
    taskType: string,
    points: number,
  ): Promise<PointEntity> {
    const createPointLogQuery = `
        INSERT INTO "PointsLogs" ("userId", "transactionType", "taskType", points)
        VALUES ($1::uuid, $2::"PointTransactionType", $3, $4)
        RETURNING *
      `;

    const createPointLogValues = [userId, transactionType, taskType, points];

    const createdPointLog = await this.prisma.$queryRawUnsafe<PointsLogs>(
      createPointLogQuery,
      ...createPointLogValues,
    );

    return createdPointLog[0];
  }

  async countTasksPerDate(userId: string, date: string): Promise<number> {
    const countTasksQuery = `
        SELECT COUNT(*) FROM "PointsLogs"
        WHERE "userId" = $1::uuid AND DATE("occurredAt") >= DATE($2) AND "transactionType" = 'EARNED'
      `;

    const countTasksValues = [userId, date];
    const tasksCount = await this.prisma.$queryRawUnsafe<number>(
      countTasksQuery,
      ...countTasksValues,
    );

    return Number(tasksCount[0].count);
  }

  async calculateUserPoints(userId: string): Promise<number> {
    const totalPointsQuery = `
        SELECT SUM(points) FROM "PointsLogs"
        WHERE "userId" = $1::uuid
      `;

    const totalPoints = await this.prisma.$queryRawUnsafe<number>(
      totalPointsQuery,
      userId,
    );

    const userTotalPoints = Number(totalPoints[0].sum) || 0;

    return userTotalPoints;
  }
}
