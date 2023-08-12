import { ApiProperty } from '@nestjs/swagger';
import { JWT_ACCESS_TOKEN } from '@shared/constants/user.constant';
import { IsString } from 'class-validator';

export class ResRefreshDto {
  @ApiProperty({ description: JWT_ACCESS_TOKEN })
  @IsString()
  readonly accessToken: string;
}
