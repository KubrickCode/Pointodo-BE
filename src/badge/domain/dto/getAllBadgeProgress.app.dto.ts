export class ReqGetAllBadgeProgressAppDto {
  readonly userId: string;
}

export class ResGetAllBadgeProgressAppDto {
  readonly badgeId: number;
  readonly progress: number;
}
