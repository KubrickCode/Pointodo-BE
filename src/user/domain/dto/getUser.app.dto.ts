import { UUID } from 'crypto';
import { ProviderType, RoleType } from '../entities/user.entity';

export class ReqGetUserAppDto {
  readonly id: UUID;
}

export class ResGetUserAppDto {
  readonly id: UUID;
  readonly email: string;
  readonly provider: ProviderType;
  readonly role: RoleType;
  readonly selectedBadgeId: number;
  readonly createdAt: Date;
}
