import { ApiProperty } from '@nestjs/swagger';
import { BADGE_TYPE_ID } from '@shared/constants/badge.constant';
import { IsInt } from 'class-validator';

export class ResGetUserBadgeListDto {
  @ApiProperty({ description: BADGE_TYPE_ID })
  @IsInt()
  readonly badgeId: number;
}
