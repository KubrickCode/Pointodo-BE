import { ApiProperty } from '@nestjs/swagger';
import { USER_ID } from '@shared/constants/user.constant';
import { IsString } from 'class-validator';

export class ReqGenerateAccessTokenAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly id: string;
}

export class ReqGenerateRefreshTokenAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly id: string;
}
