export class ReqChangeSelectedBadgeAppDto {
  readonly userId: string;
  readonly badgeId: number;
}

export class ResChangeSelectedBadgeAppDto {
  readonly message: string;
}
