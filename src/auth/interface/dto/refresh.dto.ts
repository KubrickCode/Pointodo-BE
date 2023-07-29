import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResRefreshDto {
  @ApiProperty({ description: 'JWT 액세스 토큰' })
  @IsString()
  readonly accessToken: string;
}
