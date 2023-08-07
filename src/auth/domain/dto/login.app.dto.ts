import { ApiProperty } from '@nestjs/swagger';
import {
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
  USER_ID,
} from '@shared/constants/user.constant';
import { IsString } from 'class-validator';

export class ReqLoginAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly id: string;
}

export class ResLoginAppDto {
  @ApiProperty({ description: JWT_ACCESS_TOKEN })
  @IsString()
  readonly accessToken: string;

  @ApiProperty({ description: JWT_REFRESH_TOKEN })
  @IsString()
  readonly refreshToken?: string;
}
