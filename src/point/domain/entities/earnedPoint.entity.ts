import { EarnedPointsLogs } from '@prisma/client';

export class EarnedPointEntity implements EarnedPointsLogs {
  id: number;
  taskId: number;
  points: number;
  occurredAt: Date;
}

export class EarnedPointWithTaskName extends EarnedPointEntity {
  taskName: string;
}
