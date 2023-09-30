import { ApiProperty } from '@nestjs/swagger';
import { BadgeConstant } from '@shared/constants/badge.constant';
import { IsInt } from 'class-validator';

export class ResGetUserBadgeListDto {
  @ApiProperty({ description: BadgeConstant.BADGE_ID })
  @IsInt()
  readonly badgeId: number;
}
