import { BadgeProgress } from '@prisma/client';

export class BadgeProgressEntity implements BadgeProgress {
  id: number;
  userId: string;
  badgeType: string;
  progress: number;
  occurredAt: Date;
}
