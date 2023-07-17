import { Provider } from '@prisma/client';
import { IsString } from 'class-validator';

class ReqSocialLoginAppDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly provider: Provider;
}

export { ReqSocialLoginAppDto };
