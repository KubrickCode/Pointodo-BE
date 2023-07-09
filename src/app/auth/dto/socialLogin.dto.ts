import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class ResSocialLoginDto {
  @ApiProperty({ description: 'JWT 액세스 토큰' })
  @IsString()
  readonly accessToken: string;
}

class RedirectSocialLoginDto {
  @ApiProperty({
    example: '/social-login',
    description: '클라이언트 리다이렉트 경로',
  })
  redirectUri: string;
}

export { ResSocialLoginDto, RedirectSocialLoginDto };
