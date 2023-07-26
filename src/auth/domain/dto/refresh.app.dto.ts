import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqRefreshAppDto {
  @ApiProperty({ description: 'JWT 리프레시 토큰' })
  @IsString()
  readonly refreshToken: string;
}

export class ResRefreshAppDto {
  @ApiProperty({ description: 'JWT 액세스 토큰' })
  @IsString()
  readonly accessToken: string;
}
