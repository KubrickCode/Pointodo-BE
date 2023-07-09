import { Provider } from '@prisma/client';
import { IsString } from 'class-validator';

class DomainReqSocialLoginDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly provider: Provider;
}

export { DomainReqSocialLoginDto };
