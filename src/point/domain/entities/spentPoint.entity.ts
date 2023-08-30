import { SpentPointsLogs } from '@prisma/client';
import { UUID } from 'crypto';

export class SpentPointEntity implements SpentPointsLogs {
  id: number;
  badgeLogId: number;
  userId: UUID;
  points: number;
  occurredAt: Date;
}

export class SpentPointWithBadgeName extends SpentPointEntity {
  badgeName: string;
}
