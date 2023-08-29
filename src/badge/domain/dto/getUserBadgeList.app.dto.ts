import { UUID } from 'crypto';

export class ReqGetUserBadgeListAppDto {
  readonly userId: UUID;
}

export class ResGetUserBadgeListAppDto {
  readonly badgeId: number;
}
