import { PointEntity } from '../entities/point.entity';

export interface IPointRepository {
  isContinuous(userId: string, yesterday: string): Promise<boolean>;
  createPointLog(
    userId: string,
    taskType: string,
    points: number,
  ): Promise<PointEntity>;

  countTasksPerDate(userId: string, date: string): Promise<number>;
  calculateUserPoints(userId: string): Promise<number>;
}
