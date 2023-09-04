import { EarnedPointsLogs } from '@prisma/client';
import { Expose } from 'class-transformer';
import { UUID } from 'crypto';

export class EarnedPointsLogEntity implements EarnedPointsLogs {
  @Expose() readonly id: number;
  @Expose() readonly taskId: number;
  @Expose() readonly userId: UUID;
  @Expose() readonly points: number;
  @Expose() readonly occurredAt: Date;
}

export class EarnedPointsLogWithTaskName extends EarnedPointsLogEntity {
  @Expose() readonly taskName: string;
}

export class TopOfUserOnDate {
  @Expose() readonly userId: UUID;
  @Expose() readonly email: string;
  @Expose() readonly points: number;
}
