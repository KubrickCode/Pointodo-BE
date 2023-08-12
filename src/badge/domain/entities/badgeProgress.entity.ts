import { BadgeProgress } from '@prisma/client';

export class BadgeProgressEntity implements BadgeProgress {
  id: number;
  userId: string;
  badgeId: number;
  progress: number;
  occurredAt: Date;
}
