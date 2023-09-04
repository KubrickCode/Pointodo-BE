import { EarnedPointsLogs } from '@prisma/client';
import { Expose } from 'class-transformer';
import { UUID } from 'crypto';

export class EarnedPointEntity implements EarnedPointsLogs {
  @Expose() readonly id: number;
  @Expose() readonly taskId: number;
  @Expose() readonly userId: UUID;
  @Expose() readonly points: number;
  @Expose() readonly occurredAt: Date;
}

export class EarnedPointWithTaskName extends EarnedPointEntity {
  @Expose() readonly taskName: string;
}
