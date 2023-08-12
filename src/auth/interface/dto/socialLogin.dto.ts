import { ApiProperty } from '@nestjs/swagger';
import { JWT_ACCESS_TOKEN } from '@shared/constants/user.constant';
import { ProviderType } from '@user/domain/entities/user.entity';
import { IsString } from 'class-validator';

export class ResSocialLoginDto {
  @ApiProperty({ description: JWT_ACCESS_TOKEN })
  @IsString()
  readonly accessToken: string;
}

export class ReqSocialLoginDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly provider: ProviderType;
}

export class RedirectSocialLoginDto {
  @ApiProperty({
    example: '/social-login',
    description: '클라이언트 리다이렉트 경로',
  })
  @IsString()
  readonly redirectUri: string;
}
