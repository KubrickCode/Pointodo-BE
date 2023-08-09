import { EarnedPointsLogs } from '@prisma/client';

export class EarnedPointEntity implements EarnedPointsLogs {
  id: number;
  userId: string;
  taskId: number;
  points: number;
  occurredAt: Date;
}