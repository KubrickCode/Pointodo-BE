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
    userId: string,
    limit: number,
    offset: number,
    order: string,
  ): Promise<EarnedPointWithTaskName[]>;

  getSpentPointsLogs(
    userId: string,
    limit: number,
    offset: number,
    order: string,
  ): Promise<SpentPointWithBadgeName[]>;

  getTotalPointPages(userId: string, transactionType: string): Promise<number>;

  isContinuous(userId: string, yesterday: string): Promise<boolean>;

  createEarnedPointLog(
    userId: string,
    taskId: number,
    points: number,
  ): Promise<EarnedPointEntity>;

  createSpentPointLog(
    userId: string,
    badgeId: number,
    points: number,
  ): Promise<SpentPointEntity>;

  countTasksPerDate(userId: string, date: string): Promise<number>;

  calculateUserPoints(userId: string): Promise<number>;

  deleteEarnedPointLog(id: number): Promise<EarnedPointEntity>;

  deleteSpentPointLog(id: number): Promise<SpentPointEntity>;
}
