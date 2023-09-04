import { BadgeProgress } from '@prisma/client';
import { UUID } from 'crypto';
import { Expose } from 'class-transformer';

export class BadgeProgressEntity implements BadgeProgress {
  @Expose() readonly id: number;
  @Expose() readonly userId: UUID;
  @Expose() readonly badgeId: number;
  @Expose() readonly progress: number;
  @Expose() readonly occurredAt: Date;
}
