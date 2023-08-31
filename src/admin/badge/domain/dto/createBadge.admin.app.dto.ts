import { BadgeType_ } from '../entities/badge.entity';

export class ReqAdminCreateBadgeAppDto {
  readonly name: string;
  readonly description: string;
  readonly iconLink: string;
  readonly type: BadgeType_;
  readonly price?: number;
}

export class ResAdminCreateBadgeAppDto {
  readonly id: number;
  readonly message: string;
}
