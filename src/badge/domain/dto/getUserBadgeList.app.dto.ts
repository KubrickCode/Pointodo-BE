import { ApiProperty } from '@nestjs/swagger';
import { BADGE_TYPE_ID } from '@shared/constants/badge.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { IsInt, IsString } from 'class-validator';

export class ReqGetUserBadgeListAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly userId: string;
}

export class ResGetUserBadgeListAppDto {
  @ApiProperty({ description: BADGE_TYPE_ID })
  @IsInt()
  readonly badgeId: number;
}
