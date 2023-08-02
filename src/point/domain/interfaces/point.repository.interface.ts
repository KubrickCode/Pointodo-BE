import { PointEntity } from '../entities/point.entity';

export interface IPointRepository {
  getAllPointsLogs(userId: string): Promise<PointEntity[]>;
  isContinuous(userId: string, yesterday: string): Promise<boolean>;
  createPointLog(
    userId: string,
    transactionType: string,
    taskType: string,
    points: number,
  ): Promise<PointEntity>;

  countTasksPerDate(userId: string, date: string): Promise<number>;
  calculateUserPoints(userId: string): Promise<number>;
}
