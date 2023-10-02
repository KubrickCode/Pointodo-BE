import { UUID } from 'crypto';
import { Expose } from 'class-transformer';

export class ReqGetUserBadgeListAppDto {
  readonly userId: UUID;
}

export class ResGetUserBadgeListAppDto {
  @Expose() readonly badgeId: number;
}
