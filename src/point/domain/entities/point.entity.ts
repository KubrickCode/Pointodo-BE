import { PointTransactionType, PointsLogs } from '@prisma/client';

export class PointEntity implements PointsLogs {
  id: number;
  userId: string;
  taskType: string;
  transactionType: PointTransactionType;
  points: number;
  occurredAt: Date;
}
