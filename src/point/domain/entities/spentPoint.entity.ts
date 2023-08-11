import { SpentPointsLogs } from '@prisma/client';

export class SpentPointEntity implements SpentPointsLogs {
  id: number;
  userId: string;
  badgeId: number;
  points: number;
  occurredAt: Date;
}

export class SpentPointWithBadgeName extends SpentPointEntity {
  badgeName: string;
}
