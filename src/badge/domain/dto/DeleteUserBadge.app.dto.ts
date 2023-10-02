import { UUID } from 'crypto';

export class ReqDeleteUserBadgeAppDto {
  readonly userId: UUID;
  readonly badgeId: number;
}
