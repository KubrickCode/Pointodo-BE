import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/Prisma.service';
import {
  EarnedPointsLogEntity,
  EarnedPointsLogWithTaskName,
  POINT_LOG_ORDER_TYPE,
  POINT_LOG_TRANSACTION_TYPE,
  SpentPointsLogEntity,
  SpentPointsLogWithBadgeName,
} from '@point/domain/entities/PointsLog.entity';
import { IPointRepository } from '@point/domain/interfaces/Point.repository.interface';
import { IHandleDateTime } from '@shared/interfaces/IHandleDateTime';
import { plainToClass } from 'class-transformer';
import { UUID } from 'crypto';
import { ProviderConstant } from '@shared/constants/Provider.constant';
import { TransactionClient } from '@shared/types/Transaction.type';

@Injectable()
export class PointRepository implements IPointRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(ProviderConstant.IHANDLE_DATE_TIME)
    private readonly handleDateTime: IHandleDateTime,
  ) {}

  async getEarnedPointsLogs(
    userId: UUID,
    limit: number,
    offset: number,
    order: POINT_LOG_ORDER_TYPE,
  ): Promise<EarnedPointsLogWithTaskName[]> {
    const result = await this.prisma.earnedPointsLogs.findMany({
      where: {
        userId,
      },
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

    return result.map((item) =>
      plainToClass(EarnedPointsLogWithTaskName, {
        id: item.id,
        taskId: item.taskId,
        userId: item.userId,
        points: item.points,
        occurredAt: item.occurredAt,
        taskName: item.taskLog.name,
      }),
    );
  }

  async getSpentPointsLogs(
    userId: UUID,
    limit: number,
    offset: number,
    order: POINT_LOG_ORDER_TYPE,
  ): Promise<SpentPointsLogWithBadgeName[]> {
    const result = await this.prisma.spentPointsLogs.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        badgeLogId: true,
        userId: true,
        points: true,
        occurredAt: true,
        badgeLog: {
          select: {
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

    return result.map((item) =>
      plainToClass(SpentPointsLogWithBadgeName, {
        id: item.id,
        badgeLogId: item.badgeLogId,
        userId: item.userId,
        points: item.points,
        occurredAt: item.occurredAt,
        badgeName: item.badgeLog.badge.name,
      }),
    );
  }

  async getTotalPointPages(
    userId: UUID,
    transactionType: POINT_LOG_TRANSACTION_TYPE,
  ): Promise<number> {
    if (transactionType === 'earned') {
      return await this.prisma.earnedPointsLogs.count({
        where: {
          userId,
        },
      });
    }
    if (transactionType === 'spent') {
      return await this.prisma.spentPointsLogs.count({
        where: { userId },
      });
    }
  }

  async isContinuous(userId: string, tx?: TransactionClient): Promise<boolean> {
    const prisma = tx ?? this.prisma;
    const count = await prisma.earnedPointsLogs.count({
      where: {
        userId,
        occurredAt: {
          gte: new Date(this.handleDateTime.getYesterday()),
          lt: new Date(this.handleDateTime.getToday()),
        },
      },
    });

    return count > 0;
  }

  async createEarnedPointLog(
    taskId: number,
    userId: UUID,
    points: number,
    tx?: TransactionClient,
  ): Promise<EarnedPointsLogEntity> {
    const prisma = tx ?? this.prisma;
    const result = await prisma.earnedPointsLogs.create({
      data: { taskId, userId, points },
    });
    return plainToClass(EarnedPointsLogEntity, result);
  }

  async createSpentPointLog(
    badgeLogId: number,
    userId: UUID,
    points: number,
    tx?: TransactionClient,
  ): Promise<SpentPointsLogEntity> {
    const prisma = tx ?? this.prisma;
    const result = await prisma.spentPointsLogs.create({
      data: { badgeLogId, userId, points },
    });
    return plainToClass(SpentPointsLogEntity, result);
  }

  async countTasksPerDate(
    userId: string,
    date: string,
    tx?: TransactionClient,
  ): Promise<number> {
    const prisma = tx ?? this.prisma;
    return await prisma.earnedPointsLogs.count({
      where: {
        userId,
        occurredAt: {
          gte: new Date(date),
        },
      },
    });
  }

  async calculateUserPoints(userId: UUID): Promise<number> {
    const totalEarnedPoints = await this.prisma.earnedPointsLogs.aggregate({
      _sum: {
        points: true,
      },
      where: {
        userId,
      },
    });

    const totalSpentPoints = await this.prisma.spentPointsLogs.aggregate({
      _sum: {
        points: true,
      },
      where: {
        userId,
      },
    });

    const userTotalPoints =
      (totalEarnedPoints._sum.points || 0) -
      (totalSpentPoints._sum.points || 0);

    return userTotalPoints;
  }

  async deleteEarnedPointLog(id: number): Promise<EarnedPointsLogEntity> {
    const result = await this.prisma.earnedPointsLogs.delete({ where: { id } });
    return plainToClass(EarnedPointsLogEntity, result);
  }

  async deleteSpentPointLog(id: number): Promise<SpentPointsLogEntity> {
    const result = await this.prisma.spentPointsLogs.delete({ where: { id } });
    return plainToClass(SpentPointsLogEntity, result);
  }

  async calculateConsistency(
    userId: UUID,
    tx?: TransactionClient,
  ): Promise<number> {
    const prisma = tx ?? this.prisma;
    const isConsecutiveDay = (date1: Date, date2: Date): number | boolean => {
      if (
        this.handleDateTime.getDateString(date1) ===
        this.handleDateTime.getDateString(date2)
      ) {
        return 0;
      }
      if (
        this.handleDateTime.getADayAgoFromDate(date1) ===
        this.handleDateTime.getDateString(date2)
      ) {
        return 1;
      }
      return false;
    };

    const logs = await prisma.earnedPointsLogs.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        occurredAt: 'desc',
      },
    });
    let consistency = 1;
    let currentDate = logs[0]?.occurredAt;

    for (let i = 0; i < logs.length; i++) {
      const logDate = logs[i]?.occurredAt;
      if (isConsecutiveDay(currentDate, logDate) !== false) {
        consistency += isConsecutiveDay(currentDate, logDate) as number;
      } else {
        break;
      }

      currentDate = logDate;
    }

    return consistency;
  }
}
