import { UserBadgesLogs } from '@prisma/client';

export class UserBadgeEntity implements UserBadgesLogs {
  id: number;
  userId: string;
  badgeId: number;
  earnedAt: Date;
}
