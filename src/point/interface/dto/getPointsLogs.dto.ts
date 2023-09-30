import { ApiProperty } from '@nestjs/swagger';
import {
  POINT_LOG_ORDER_TYPE,
  POINT_LOG_ORDER_TYPES,
  POINT_LOG_TRANSACTION_TYPE,
  POINT_LOG_TRANSACTION_TYPES,
} from '@point/domain/entities/pointsLog.entity';
import { BadgeConstant } from '@shared/constants/badge.constant';
import { GlobalConstant } from '@shared/constants/global.constant';
import { PointConstant } from '@shared/constants/point.constant';
import { TaskConstant } from '@shared/constants/task.constant';
import { Type } from 'class-transformer';
import { IsDate, IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class ReqGetPointsLogsQueryDto {
  @ApiProperty({ description: PointConstant.POINT_TRANSACTION_TYPE })
  @IsIn(POINT_LOG_TRANSACTION_TYPES)
  readonly transactionType: POINT_LOG_TRANSACTION_TYPE;

  @ApiProperty({ description: PointConstant.POINT_PAGE })
  @Type(() => Number)
  @IsInt()
  readonly offset: number;

  @ApiProperty({ description: PointConstant.POINTS_LOGS_LIMIT })
  @Type(() => Number)
  @IsInt()
  readonly limit: number;

  @ApiProperty({ description: GlobalConstant.ORDER_BY })
  @IsIn(POINT_LOG_ORDER_TYPES)
  readonly order: POINT_LOG_ORDER_TYPE;
}

export class ResGetEarnedPointsLogsDto {
  @ApiProperty({ description: PointConstant.POINT_LOG_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: TaskConstant.TASK_TYPE_ID })
  @IsInt()
  readonly taskId: number;

  @ApiProperty({ description: PointConstant.POINTS })
  @IsInt()
  readonly points: number;

  @ApiProperty({ description: PointConstant.POINT_LOG_OCCURRED_AT })
  @IsDate()
  readonly occurredAt: Date;

  @ApiProperty({ description: TaskConstant.TASK_NAME })
  @IsString()
  readonly taskName: string;
}

export class ResGetSpentPointsLogsDto {
  @ApiProperty({ description: PointConstant.POINT_LOG_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: BadgeConstant.BADGE_LOG_ID })
  @IsOptional()
  @IsInt()
  readonly badgeLogId: number;

  @ApiProperty({ description: PointConstant.POINTS })
  @IsInt()
  readonly points: number;

  @ApiProperty({ description: PointConstant.POINT_LOG_OCCURRED_AT })
  @IsDate()
  readonly occurredAt: Date;

  @ApiProperty({ description: BadgeConstant.BADGE_NAME })
  @IsOptional()
  @IsString()
  readonly badgeName: string;
}
