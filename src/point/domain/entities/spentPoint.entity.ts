import { SpentPointsLogs } from '@prisma/client';
import { Expose } from 'class-transformer';
import { UUID } from 'crypto';

export class SpentPointEntity implements SpentPointsLogs {
  @Expose() readonly id: number;
  @Expose() readonly badgeLogId: number;
  @Expose() readonly userId: UUID;
  @Expose() readonly points: number;
  @Expose() readonly occurredAt: Date;
}

export class SpentPointWithBadgeName extends SpentPointEntity {
  @Expose() readonly badgeName: string;
}
