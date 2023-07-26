import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class ReqRefreshAppDto {
  @ApiProperty({ description: 'JWT 리프레시 토큰' })
  @IsString()
  readonly refreshToken: string;
}

class ResRefreshAppDto {
  @ApiProperty({ description: 'JWT 액세스 토큰' })
  @IsString()
  readonly accessToken: string;
}

export { ReqRefreshAppDto, ResRefreshAppDto };
