import { ProviderType } from '@user/domain/entities/User.entity';
import { UUID } from 'crypto';

export class ReqSocialLoginAppDto {
  readonly email: string;
  readonly provider: ProviderType;
}

export class ResSocialLoginAppDto {
  readonly id: UUID;
}
