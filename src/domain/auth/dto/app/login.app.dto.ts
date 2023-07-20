import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class ReqLoginAppDto {
  @ApiProperty({ description: '유저 고유 ID(UUID)' })
  @IsString()
  readonly id: string;
}

class ResLoginAppDto {
  @ApiProperty({ description: 'JWT 액세스 토큰' })
  @IsString()
  readonly accessToken: string;

  @ApiProperty({ description: 'JWT 리프레시 토큰 - 쿠키 설정' })
  @IsString()
  readonly refreshToken?: string;
}

export { ReqLoginAppDto, ResLoginAppDto };
