import { ProviderType, RoleType } from '../entities/user.entity';

export class ReqGetUserAppDto {
  readonly id: string;
}

export class ResGetUserAppDto {
  readonly id: string;
  readonly email: string;
  readonly provider: ProviderType;
  readonly role: RoleType;
  readonly selectedBadgeId: number;
  readonly createdAt: Date;
}
