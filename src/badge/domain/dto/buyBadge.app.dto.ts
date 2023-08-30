import { UUID } from 'crypto';

export class ReqBuyBadgeAppDto {
  readonly userId: UUID;
  readonly badgeId: number;
}

export class ResBuyBadgeAppDto {
  readonly message: string;
}
