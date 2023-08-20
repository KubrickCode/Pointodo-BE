import { SpentPointsLogs } from '@prisma/client';

export class SpentPointEntity implements SpentPointsLogs {
  id: number;
  badgeLogId: number;
  points: number;
  occurredAt: Date;
}

export class SpentPointWithBadgeName extends SpentPointEntity {
  badgeName: string;
}
