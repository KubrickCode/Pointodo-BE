import { UUID } from 'crypto';

export class ReqPutBadgeToUserAppDto {
  readonly badgeId: number;
  readonly userId: UUID;
}

export class ResPutBadgeToUserAppDto {
  readonly message: string;
}
