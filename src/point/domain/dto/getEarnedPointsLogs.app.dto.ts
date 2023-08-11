export class ReqGetEarnedPointsLogsAppDto {
  readonly userId: string;
  readonly order: string;
}

export class ResGetEarnedPointsLogsAppDto {
  readonly id: number;
  readonly userId: string;
  readonly taskId: number;
  readonly points: number;
  readonly occurredAt: Date;
  readonly taskName: string;
}
