import { ApiProperty } from '@nestjs/swagger';
import { BADGE_TYPE_NAME } from '@shared/constants/badge.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { IsString } from 'class-validator';

export class ReqGetUserBadgeListAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly userId: string;
}

export class ResGetUserBadgeListAppDto {
  @ApiProperty({ description: BADGE_TYPE_NAME })
  @IsString()
  readonly badgeType: string;
}
