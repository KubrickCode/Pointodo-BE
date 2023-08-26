import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RedirectSocialLoginDto {
  @ApiProperty({
    example: '/',
    description: '클라이언트 리다이렉트 경로',
  })
  @IsString()
  readonly redirectUri: string;
}
