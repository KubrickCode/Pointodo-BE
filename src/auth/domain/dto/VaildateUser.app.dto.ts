import { ProviderType, RoleType } from '@user/domain/entities/User.entity';
import { UUID } from 'crypto';

export class ReqValidateUserAppDto {
  readonly email: string;
  readonly password: string;
}

export class ResValidateUserAppDto {
  readonly id: UUID;
  readonly email: string;
  readonly provider: ProviderType;
  readonly role: RoleType;
  readonly selectedBadgeId: number;
  readonly createdAt: Date;
}
