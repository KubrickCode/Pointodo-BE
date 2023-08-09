import { ApiProperty } from '@nestjs/swagger';
import { BADGE_TYPE_ID } from '@shared/constants/badge.constant';
import {
  POINTS,
  POINT_LOG_ID,
  POINT_LOG_OCCURRED_AT,
} from '@shared/constants/point.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { IsDate, IsInt, IsString } from 'class-validator';

export class ReqGetSpentPointsLogsAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly userId: string;
}

export class ResGetSpentPointsLogsAppDto {
  @ApiProperty({ description: POINT_LOG_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: BADGE_TYPE_ID })
  @IsInt()
  readonly badgeId: number;

  @ApiProperty({ description: POINTS })
  @IsInt()
  readonly points: number;

  @ApiProperty({ description: POINT_LOG_OCCURRED_AT })
  @IsDate()
  readonly occurredAt: Date;
}
