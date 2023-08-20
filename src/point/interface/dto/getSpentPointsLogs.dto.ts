import { ApiProperty } from '@nestjs/swagger';
import { BADGE_LOG_ID, BADGE_NAME } from '@shared/constants/badge.constant';
import { ORDER_BY } from '@shared/constants/global.constant';
import {
  POINTS,
  POINT_LOG_ID,
  POINT_LOG_OCCURRED_AT,
  POINT_PAGE,
} from '@shared/constants/point.constant';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString } from 'class-validator';

export class ReqGetSpentPointsLogsQueryDto {
  @ApiProperty({ description: POINT_PAGE })
  @Type(() => Number)
  @IsInt()
  readonly page: number;

  @ApiProperty({ description: ORDER_BY })
  @IsString()
  readonly order: string;
}

export class ResGetSpentPointsLogsDto {
  @ApiProperty({ description: POINT_LOG_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: BADGE_LOG_ID })
  @IsInt()
  readonly badgeLogId: number;

  @ApiProperty({ description: POINTS })
  @IsInt()
  readonly points: number;

  @ApiProperty({ description: POINT_LOG_OCCURRED_AT })
  @IsDate()
  readonly occurredAt: Date;

  @ApiProperty({ description: BADGE_NAME })
  @IsString()
  readonly badgeName: string;
}
