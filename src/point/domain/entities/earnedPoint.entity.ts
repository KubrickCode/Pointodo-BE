import { EarnedPointsLogs } from '@prisma/client';
import { UUID } from 'crypto';

export class EarnedPointEntity implements EarnedPointsLogs {
  id: number;
  taskId: number;
  userId: UUID;
  points: number;
  occurredAt: Date;
}

export class EarnedPointWithTaskName extends EarnedPointEntity {
  taskName: string;
}
