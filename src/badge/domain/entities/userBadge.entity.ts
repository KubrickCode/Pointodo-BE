import { UserBadgesLogs } from '@prisma/client';
import { UUID } from 'crypto';

export class UserBadgeEntity implements UserBadgesLogs {
  id: number;
  userId: UUID;
  badgeId: number;
  earnedAt: Date;
}
