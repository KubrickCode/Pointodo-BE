import { PointsLogs } from '@prisma/client';

export class PointEntity implements PointsLogs {
  id: number;
  userId: string;
  pointTransactionTypesId: number;
  taskTypesId: number;
  points: number;
  occurredAt: Date;
}
