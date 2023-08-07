import { ApiProperty } from '@nestjs/swagger';
import {
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
} from '@shared/constants/user.constant';
import { IsString } from 'class-validator';

export class ReqRefreshAppDto {
  @ApiProperty({ description: JWT_REFRESH_TOKEN })
  @IsString()
  readonly refreshToken: string;
}

export class ResRefreshAppDto {
  @ApiProperty({ description: JWT_ACCESS_TOKEN })
  @IsString()
  readonly accessToken: string;
}
