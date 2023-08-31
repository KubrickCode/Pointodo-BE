import { UUID } from 'crypto';
import {
  EarnedPointEntity,
  EarnedPointWithTaskName,
} from '../entities/earnedPoint.entity';
import {
  SpentPointEntity,
  SpentPointWithBadgeName,
} from '../entities/spentPoint.entity';

export interface IPointRepository {
  getEarnedPointsLogs(
    userId: UUID,
    limit: number,
    offset: number,
    order: string,
  ): Promise<EarnedPointWithTaskName[]>;

  getSpentPointsLogs(
    userId: UUID,
    limit: number,
    offset: number,
    order: string,
  ): Promise<SpentPointWithBadgeName[]>;

  getTotalPointPages(
    userId: UUID,
    transactionType: 'EARNED' | 'SPENT',
  ): Promise<number>;

  isContinuous(userId: UUID): Promise<boolean>;

  createEarnedPointLog(
    taskId: number,
    userId: UUID,
    points: number,
  ): Promise<EarnedPointEntity>;

  createSpentPointLog(
    badgeLogId: number,
    userId: UUID,
    points: number,
  ): Promise<SpentPointEntity>;

  countTasksPerDate(userId: UUID, date: string): Promise<number>;

  calculateUserPoints(userId: UUID): Promise<number>;

  deleteEarnedPointLog(id: number): Promise<EarnedPointEntity>;

  deleteSpentPointLog(id: number): Promise<SpentPointEntity>;
}
