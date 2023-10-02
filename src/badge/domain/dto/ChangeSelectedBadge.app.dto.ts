import { UUID } from 'crypto';

export class ReqChangeSelectedBadgeAppDto {
  readonly userId: UUID;
  readonly badgeId: number;
}
