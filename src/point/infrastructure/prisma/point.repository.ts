import { Injectable } from '@nestjs/common';
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
    limit: number,
    offset: number,
    order: string,
  ): Promise<EarnedPointWithTaskName[]> {
    const result = await this.prisma.earnedPointsLogs.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        taskId: true,
        points: true,
        occurredAt: true,
        taskLog: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        occurredAt: order === 'newest' ? 'desc' : 'asc',
      },
      take: limit,
      skip: offset,
    });

    return result.map((item) => ({
      id: item.id,
      userId: item.userId,
      taskId: item.taskId,
      points: item.points,
      occurredAt: item.occurredAt,
      taskName: item.taskLog.name,
    }));
  }

  async getSpentPointsLogs(
    userId: string,
    limit: number,
    offset: number,
    order: string,
  ): Promise<SpentPointWithBadgeName[]> {
    const result = await this.prisma.spentPointsLogs.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        badgeId: true,
        points: true,
        occurredAt: true,
        badge: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        occurredAt: order === 'newest' ? 'desc' : 'asc',
      },
      take: limit,
      skip: offset,
    });

    return result.map((item) => ({
      id: item.id,
      userId: item.userId,
      badgeId: item.badgeId,
      points: item.points,
      occurredAt: item.occurredAt,
      badgeName: item.badge.name,
    }));
  }

  async getTotalPointPages(
    userId: string,
    transactionType: 'EARNED' | 'SPENT',
  ): Promise<number> {
    if (transactionType === 'EARNED') {
      return await this.prisma.earnedPointsLogs.count({ where: { userId } });
    }
    if (transactionType === 'SPENT') {
      return await this.prisma.spentPointsLogs.count({ where: { userId } });
    }
  }

  async isContinuous(userId: string, yesterday: string): Promise<boolean> {
    const count = await this.prisma.earnedPointsLogs.count({
      where: {
        userId: userId,
        occurredAt: new Date(yesterday),
      },
    });

    return count > 0;
  }

  async createEarnedPointLog(
    userId: string,
    taskId: number,
    points: number,
  ): Promise<EarnedPointEntity> {
    return await this.prisma.earnedPointsLogs.create({
      data: { userId, taskId, points },
    });
  }

  async createSpentPointLog(
    userId: string,
    badgeId: number,
    points: number,
  ): Promise<SpentPointEntity> {
    return await this.prisma.spentPointsLogs.create({
      data: { userId, badgeId, points },
    });
  }

  async countTasksPerDate(userId: string, date: string): Promise<number> {
    const tasksCount = await this.prisma.earnedPointsLogs.count({
      where: {
        userId: userId,
        occurredAt: {
          gte: new Date(date),
        },
      },
    });

    return tasksCount;
  }

  async calculateUserPoints(userId: string): Promise<number> {
    const totalEarnedPoints = await this.prisma.earnedPointsLogs.aggregate({
      _sum: {
        points: true,
      },
      where: {
        userId: userId,
      },
    });

    const totalSpentPoints = await this.prisma.spentPointsLogs.aggregate({
      _sum: {
        points: true,
      },
      where: {
        userId: userId,
      },
    });

    const userTotalPoints =
      (totalEarnedPoints._sum.points || 0) -
      (totalSpentPoints._sum.points || 0);

    return userTotalPoints;
  }

  async deleteEarnedPointLog(id: number): Promise<EarnedPointEntity> {
    return await this.prisma.earnedPointsLogs.delete({ where: { id } });
  }

  async deleteSpentPointLog(id: number): Promise<SpentPointEntity> {
    return await this.prisma.spentPointsLogs.delete({ where: { id } });
  }
}
