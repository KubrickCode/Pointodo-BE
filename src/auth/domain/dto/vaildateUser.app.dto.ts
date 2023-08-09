import { ProviderType, RoleType } from '@user/domain/entities/user.entity';

export class ReqValidateUserAppDto {
  readonly email: string;
  readonly password: string;
}

export class ResValidateUserAppDto {
  readonly id: string;
  readonly email: string;
  readonly provider: ProviderType;
  readonly role: RoleType;
  readonly selectedBadge: number;
  readonly createdAt: Date;
}
