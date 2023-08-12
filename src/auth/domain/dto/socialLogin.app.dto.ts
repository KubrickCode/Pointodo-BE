import { ProviderType } from '@user/domain/entities/user.entity';

export class ReqSocialLoginAppDto {
  readonly email: string;
  readonly provider: ProviderType;
}
