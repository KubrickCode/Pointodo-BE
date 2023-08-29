import { UUID } from 'crypto';

export class ReqGetAllBadgeProgressAppDto {
  readonly userId: UUID;
}

export class ResGetAllBadgeProgressAppDto {
  readonly badgeId: number;
  readonly progress: number;
}
