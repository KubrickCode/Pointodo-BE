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
    const result = await this.prisma.earnedPointsLogs.findMany({
      where: {
        taskLog: {
          userId,
        },
      },
      select: {
        id: true,
        taskId: true,
        points: true,
        occurredAt: true,
        taskLog: {
          select: {
            userId: true,
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
      userId: item.taskLog.userId,
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
      where: {
        badgeLog: {
          userId,
        },
      },
      select: {
        id: true,
        badgeLogId: true,
        points: true,
        occurredAt: true,
        badgeLog: {
          select: {
            userId: true,
            badge: {
              select: {
                name: true,
              },
            },
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
      userId: item.badgeLog.userId,
      badgeLogId: item.badgeLogId,
      points: item.points,
      occurredAt: item.occurredAt,
      badgeName: item.badgeLog.badge.name,
    }));
  }

  async getTotalPointPages(
    userId: string,
    transactionType: 'EARNED' | 'SPENT',
  ): Promise<number> {
    if (transactionType === 'EARNED') {
      return await this.prisma.earnedPointsLogs.count({
        where: {
          taskLog: {
            userId,
          },
        },
      });
    }
    if (transactionType === 'SPENT') {
      return await this.prisma.spentPointsLogs.count({
        where: { badgeLog: { userId } },
      });
    }
  }

  async isContinuous(userId: string): Promise<boolean> {
    const count = await this.prisma.earnedPointsLogs.count({
      where: {
        taskLog: { userId },
        occurredAt: {
          gte: new Date(HandleDateTime.getYesterday),
          lt: new Date(HandleDateTime.getToday),
        },
      },
    });

    return count > 0;
  }

  async createEarnedPointLog(
    taskId: number,
    points: number,
  ): Promise<EarnedPointEntity> {
    return await this.prisma.earnedPointsLogs.create({
      data: { taskId, points },
    });
  }

  async createSpentPointLog(
    badgeLogId: number,
    points: number,
  ): Promise<SpentPointEntity> {
    return await this.prisma.spentPointsLogs.create({
      data: { points, badgeLogId },
    });
  }

  async countTasksPerDate(userId: string, date: string): Promise<number> {
    return await this.prisma.earnedPointsLogs.count({
      where: {
        taskLog: { userId },
        occurredAt: {
          gte: new Date(date),
        },
      },
    });
  }

  async calculateUserPoints(userId: string): Promise<number> {
    const totalEarnedPoints = await this.prisma.earnedPointsLogs.aggregate({
      _sum: {
        points: true,
      },
      where: {
        taskLog: { userId },
      },
    });

    const totalSpentPoints = await this.prisma.spentPointsLogs.aggregate({
      _sum: {
        points: true,
      },
      where: {
        badgeLog: { userId },
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
