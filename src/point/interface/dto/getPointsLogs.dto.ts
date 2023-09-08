import { ApiProperty } from '@nestjs/swagger';
import { BADGE_LOG_ID, BADGE_NAME } from '@shared/constants/badge.constant';
import { ORDER_BY } from '@shared/constants/global.constant';
import {
  POINTS,
  POINTS_LOGS_LIMIT,
  POINT_LOG_ID,
  POINT_LOG_OCCURRED_AT,
  POINT_PAGE,
  POINT_TRANSACTION_TYPE,
} from '@shared/constants/point.constant';
import { TASK_NAME, TASK_TYPE_ID } from '@shared/constants/task.constant';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class ReqGetPointsLogsQueryDto {
  @ApiProperty({ description: POINT_TRANSACTION_TYPE })
  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(['EARNED', 'SPENT'])
  readonly transactionType: 'EARNED' | 'SPENT';

  @ApiProperty({ description: POINT_PAGE })
  @Type(() => Number)
  @IsInt()
  readonly offset: number;

  @ApiProperty({ description: POINTS_LOGS_LIMIT })
  @Type(() => Number)
  @IsInt()
  readonly limit: number;

  @ApiProperty({ description: ORDER_BY })
  @IsString()
  readonly order: string;
}

export class ResGetEarnedPointsLogsDto {
  @ApiProperty({ description: POINT_LOG_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: TASK_TYPE_ID })
  @IsInt()
  readonly taskId: number;

  @ApiProperty({ description: POINTS })
  @IsInt()
  readonly points: number;

  @ApiProperty({ description: POINT_LOG_OCCURRED_AT })
  @IsDate()
  readonly occurredAt: Date;

  @ApiProperty({ description: TASK_NAME })
  @IsString()
  readonly taskName: string;
}

export class ResGetSpentPointsLogsDto {
  @ApiProperty({ description: POINT_LOG_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: BADGE_LOG_ID })
  @IsOptional()
  @IsInt()
  readonly badgeLogId: number;

  @ApiProperty({ description: POINTS })
  @IsInt()
  readonly points: number;

  @ApiProperty({ description: POINT_LOG_OCCURRED_AT })
  @IsDate()
  readonly occurredAt: Date;

  @ApiProperty({ description: BADGE_NAME })
  @IsOptional()
  @IsString()
  readonly badgeName: string;
}
