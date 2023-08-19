export class ReqGetSpentPointsLogsAppDto {
  readonly userId: string;
  readonly order: string;
  readonly page: number;
}

export class ResGetSpentPointsLogsAppDto {
  readonly id: number;
  readonly badgeLogId: number;
  readonly points: number;
  readonly occurredAt: Date;
  readonly badgeName: string;
}
