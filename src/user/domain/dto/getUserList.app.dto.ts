import { UUID } from 'crypto';
import { ProviderType, RoleType } from '../entities/user.entity';

export class ReqGetUserListAppDto {
  readonly order: string;
  readonly page: number;
  readonly provider: ProviderType | 'ALL';
}

export class ResGetUserListAppDto {
  readonly id: UUID;
  readonly email: string;
  readonly provider: ProviderType;
  readonly role: RoleType;
  readonly selectedBadgeId: number;
  readonly createdAt: Date;
}
