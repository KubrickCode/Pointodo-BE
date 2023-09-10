import { ApiProperty } from '@nestjs/swagger';
import {
  POINT_LOG_ORDER_TYPE,
  POINT_LOG_ORDER_TYPES,
  POINT_LOG_TRANSACTION_TYPE,
  POINT_LOG_TRANSACTION_TYPES,
} from '@point/domain/entities/pointsLog.entity';
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
import { Type } from 'class-transformer';
import { IsDate, IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class ReqGetPointsLogsQueryDto {
  @ApiProperty({ description: POINT_TRANSACTION_TYPE })
  @IsIn(POINT_LOG_TRANSACTION_TYPES)
  readonly transactionType: POINT_LOG_TRANSACTION_TYPE;

  @ApiProperty({ description: POINT_PAGE })
  @Type(() => Number)
  @IsInt()
  readonly offset: number;

  @ApiProperty({ description: POINTS_LOGS_LIMIT })
  @Type(() => Number)
  @IsInt()
  readonly limit: number;

  @ApiProperty({ description: ORDER_BY })
  @IsIn(POINT_LOG_ORDER_TYPES)
  readonly order: POINT_LOG_ORDER_TYPE;
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
