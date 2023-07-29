import { ApiProperty } from '@nestjs/swagger';
import { Provider } from '@prisma/client';
import { IsString } from 'class-validator';

export class ResSocialLoginDto {
  @ApiProperty({ description: 'JWT 액세스 토큰' })
  @IsString()
  readonly accessToken: string;
}

export class ReqSocialLoginDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly provider: Provider;
}

export class RedirectSocialLoginDto {
  @ApiProperty({
    example: '/social-login',
    description: '클라이언트 리다이렉트 경로',
  })
  @IsString()
  readonly redirectUri: string;
}