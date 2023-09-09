import { UUID } from 'crypto';
import {
  EarnedPointsLogEntity,
  EarnedPointsLogWithTaskName,
  SpentPointsLogEntity,
  SpentPointsLogWithBadgeName,
} from '../entities/pointsLog.entity';

export interface IPointRepository {
  getEarnedPointsLogs(
    userId: UUID,
    limit: number,
    offset: number,
    order: string,
  ): Promise<EarnedPointsLogWithTaskName[]>;

  getSpentPointsLogs(
    userId: UUID,
    limit: number,
    offset: number,
    order: string,
  ): Promise<SpentPointsLogWithBadgeName[]>;

  getTotalPointPages(
    userId: UUID,
    transactionType: 'EARNED' | 'SPENT',
  ): Promise<number>;

  isContinuous(userId: UUID): Promise<boolean>;

  createEarnedPointLog(
    taskId: number,
    userId: UUID,
    points: number,
  ): Promise<EarnedPointsLogEntity>;

  createSpentPointLog(
    badgeLogId: number,
    userId: UUID,
    points: number,
  ): Promise<SpentPointsLogEntity>;

  countTasksPerDate(userId: UUID, date: string): Promise<number>;

  calculateUserPoints(userId: UUID): Promise<number>;

  deleteEarnedPointLog(id: number): Promise<EarnedPointsLogEntity>;

  deleteSpentPointLog(id: number): Promise<SpentPointsLogEntity>;
}
