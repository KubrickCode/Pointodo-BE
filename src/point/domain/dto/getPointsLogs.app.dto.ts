import { UUID } from 'crypto';

export class ReqGetPointsLogsAppDto {
  readonly userId: UUID;
  readonly order: string;
  readonly offset: number;
  readonly limit: number;
}

export class ResGetEarnedPointsLogsAppDto {
  readonly id: number;
  readonly taskId: number;
  readonly points: number;
  readonly occurredAt: Date;
  readonly taskName: string;
}

export class ResGetSpentPointsLogsAppDto {
  readonly id: number;
  readonly badgeLogId: number;
  readonly points: number;
  readonly occurredAt: Date;
  readonly badgeName: string;
}
