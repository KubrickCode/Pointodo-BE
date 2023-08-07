import { ApiProperty } from '@nestjs/swagger';
import {
  BADGE_PROGRESS,
  BADGE_TYPE_NAME,
} from '@shared/constants/badge.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { IsInt, IsString } from 'class-validator';

export class ReqGetAllBadgeProgressAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly userId: string;
}

export class ResGetAllBadgeProgressAppDto {
  @ApiProperty({ description: BADGE_TYPE_NAME })
  @IsString()
  readonly badgeType: string;

  @ApiProperty({ description: BADGE_PROGRESS })
  @IsInt()
  readonly progress: number;
}
