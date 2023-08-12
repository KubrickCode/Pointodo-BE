export class ReqPutBadgeToUserAppDto {
  readonly badgeId: number;
  readonly userId: string;
}

export class ResPutBadgeToUserAppDto {
  readonly message: string;
}
