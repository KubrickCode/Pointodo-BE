import { ApiProperty } from '@nestjs/swagger';
import {
  BADGE_PROGRESS,
  BADGE_TYPE_NAME,
} from '@shared/constants/badge.constant';
import { IsInt, IsString } from 'class-validator';

export class ResGetAllBadgeProgressDto {
  @ApiProperty({ description: BADGE_TYPE_NAME })
  @IsString()
  readonly badgeType: string;

  @ApiProperty({ description: BADGE_PROGRESS })
  @IsInt()
  readonly progress: number;
}
