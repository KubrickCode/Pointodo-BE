export class ReqGetSpentPointsLogsAppDto {
  readonly userId: string;
}

export class ResGetSpentPointsLogsAppDto {
  readonly id: number;
  readonly userId: string;
  readonly badgeId: number;
  readonly points: number;
  readonly occurredAt: Date;
  readonly badgeName: string;
}
