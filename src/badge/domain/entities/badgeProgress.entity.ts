import { BadgeProgress } from '@prisma/client';
import { UUID } from 'crypto';

export class BadgeProgressEntity implements BadgeProgress {
  id: number;
  userId: UUID;
  badgeId: number;
  progress: number;
  occurredAt: Date;
}
