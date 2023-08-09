import { ApiProperty } from '@nestjs/swagger';
import {
  BADGE_PROGRESS,
  BADGE_TYPE_ID,
} from '@shared/constants/badge.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { IsInt, IsString } from 'class-validator';

export class ReqGetAllBadgeProgressAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly userId: string;
}

export class ResGetAllBadgeProgressAppDto {
  @ApiProperty({ description: BADGE_TYPE_ID })
  @IsString()
  readonly badgeId: number;

  @ApiProperty({ description: BADGE_PROGRESS })
  @IsInt()
  readonly progress: number;
}
