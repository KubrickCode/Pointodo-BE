import { UUID } from 'crypto';
import { ProviderType, RoleType } from '../entities/user.entity';
import { Transform, Type } from 'class-transformer';

export class ReqGetUserAppDto {
  readonly id: UUID;
}

export class ResGetUserAppDto {
  readonly id: UUID;
  readonly email: string;
  readonly provider: ProviderType;
  readonly role: RoleType;
  readonly selectedBadgeId: number;
  readonly selectedBadge?: { iconLink: string };

  @Type(() => Date)
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  readonly createdAt: Date;
}
