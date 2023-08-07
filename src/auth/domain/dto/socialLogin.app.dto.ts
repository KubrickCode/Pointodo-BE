import { ApiProperty } from '@nestjs/swagger';
import { Provider } from '@prisma/client';
import { USER_EMAIL, USER_PROVIDER } from '@shared/constants/user.constant';
import { IsString } from 'class-validator';

export class ReqSocialLoginAppDto {
  @ApiProperty({ description: USER_EMAIL })
  @IsString()
  readonly email: string;

  @ApiProperty({ description: USER_PROVIDER })
  @IsString()
  readonly provider: Provider;
}
