import { UserBadgesLogs } from '@prisma/client';
import { Expose } from 'class-transformer';
import { UUID } from 'crypto';

export class UserBadgeLogEntity implements UserBadgesLogs {
  @Expose() readonly id: number;
  @Expose() readonly userId: UUID;
  @Expose() readonly badgeId: number;
  @Expose() readonly earnedAt: Date;
}
