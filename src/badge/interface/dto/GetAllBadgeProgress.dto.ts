import { ApiProperty } from '@nestjs/swagger';
import { BadgeConstant } from '@shared/constants/Badge.constant';
import { IsInt } from 'class-validator';

export class ResGetAllBadgeProgressDto {
  @ApiProperty({ description: BadgeConstant.BADGE_ID })
  @IsInt()
  readonly badgeId: number;

  @ApiProperty({ description: BadgeConstant.BADGE_PROGRESS })
  @IsInt()
  readonly progress: number;
}
