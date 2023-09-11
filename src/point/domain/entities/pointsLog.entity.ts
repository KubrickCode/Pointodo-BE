import { EarnedPointsLogs, SpentPointsLogs } from '@prisma/client';
import { Expose } from 'class-transformer';
import { UUID } from 'crypto';

export class EarnedPointsLogEntity implements EarnedPointsLogs {
  @Expose() readonly id: number;
  @Expose() readonly taskId: number;
  @Expose() readonly userId: UUID;
  @Expose() readonly points: number;
  @Expose() readonly occurredAt: Date;
}

export class EarnedPointsLogWithTaskName extends EarnedPointsLogEntity {
  @Expose() readonly taskName: string;
}

export class SpentPointsLogEntity implements SpentPointsLogs {
  @Expose() readonly id: number;
  @Expose() readonly badgeLogId: number;
  @Expose() readonly userId: UUID;
  @Expose() readonly points: number;
  @Expose() readonly occurredAt: Date;
}

export class SpentPointsLogWithBadgeName extends SpentPointsLogEntity {
  @Expose() readonly badgeName: string;
}

export type POINT_LOG_ORDER_TYPE = 'newest' | 'old';

export const POINT_LOG_ORDER_TYPES = ['newest', 'old'];

export type POINT_LOG_TRANSACTION_TYPE = 'earned' | 'spent';

export const POINT_LOG_TRANSACTION_TYPES = ['earned', 'spent'];
