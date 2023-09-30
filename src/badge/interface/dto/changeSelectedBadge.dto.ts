import { ApiProperty } from '@nestjs/swagger';
import { BadgeConstant } from '@shared/constants/badge.constant';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class ReqChangeSelectedBadgeParamDto {
  @ApiProperty({ description: BadgeConstant.BADGE_ID })
  @Type(() => Number)
  @IsInt()
  readonly badgeId: number;
}
