import { ApiProperty } from '@nestjs/swagger';
import {
  BADGE_PROGRESS,
  BADGE_TYPE_ID,
} from '@shared/constants/badge.constant';
import { IsInt } from 'class-validator';

export class ResGetAllBadgeProgressDto {
  @ApiProperty({ description: BADGE_TYPE_ID })
  @IsInt()
  readonly badgeId: number;

  @ApiProperty({ description: BADGE_PROGRESS })
  @IsInt()
  readonly progress: number;
}
