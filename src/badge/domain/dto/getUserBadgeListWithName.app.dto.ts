import { UUID } from 'crypto';

export class ReqGetUserBadgeListWithNameAppDto {
  readonly userId: UUID;
}

export class ResGetUserBadgeListWithNameAppDto {
  readonly badgeId: number;
  readonly name: string;
}
