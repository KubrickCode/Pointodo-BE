import { Prisma } from '@prisma/client';
import { PointEntity } from '../entities/point.entity';

export interface IPointRepository {
  getAllPointsLogs(userId: string): Promise<PointEntity[]>;
  isContinuous(
    userId: string,
    yesterday: string,
    tx?: Prisma.TransactionClient,
  ): Promise<boolean>;
  createPointLog(
    userId: string,
    transactionType: string,
    taskType: string,
    points: number,
    tx?: Prisma.TransactionClient,
  ): Promise<PointEntity>;

  countTasksPerDate(
    userId: string,
    date: string,
    tx?: Prisma.TransactionClient,
  ): Promise<number>;
  calculateUserPoints(userId: string): Promise<number>;
}
