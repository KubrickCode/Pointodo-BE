import { ApiProperty } from '@nestjs/swagger';
import { BADGE_ID, BADGE_NAME } from '@shared/constants/badge.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { IsInt, IsString } from 'class-validator';

export class ReqGetUserBadgeListParamDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly id: string;
}

export class ResGetUserBadgeListDto {
  @ApiProperty({ description: BADGE_ID })
  @IsInt()
  readonly badgeId: number;

  @ApiProperty({ description: BADGE_NAME })
  @IsString()
  readonly name: string;
}
