import { UUID } from 'crypto';

export class ReqGetEarnedPointsLogsAppDto {
  readonly userId: UUID;
  readonly order: string;
  readonly page: number;
}

export class ResGetEarnedPointsLogsAppDto {
  readonly id: number;
  readonly taskId: number;
  readonly points: number;
  readonly occurredAt: Date;
  readonly taskName: string;
}
