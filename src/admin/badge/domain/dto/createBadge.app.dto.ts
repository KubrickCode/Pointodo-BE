import { BadgeType_ } from '../entities/badge.entity';

export class ReqCreateBadgeAppDto {
  readonly name: string;
  readonly description: string;
  readonly iconLink: string;
  readonly type: BadgeType_;
  readonly price?: number;
}

export class ResCreateBadgeAppDto {
  readonly message: string;
}
