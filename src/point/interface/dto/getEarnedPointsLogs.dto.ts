import { ApiProperty } from '@nestjs/swagger';
import { ORDER_BY } from '@shared/constants/global.constant';
import {
  POINTS,
  POINT_LOG_ID,
  POINT_LOG_OCCURRED_AT,
  POINT_PAGE,
} from '@shared/constants/point.constant';
import { TASK_NAME, TASK_TYPE_ID } from '@shared/constants/task.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString } from 'class-validator';

export class ReqGetEarnedPointsLogsQueryDto {
  @ApiProperty({ description: POINT_PAGE })
  @Type(() => Number)
  @IsInt()
  readonly page: number;

  @ApiProperty({ description: ORDER_BY })
  @IsString()
  readonly order: string;
}

export class ResGetEarnedPointsLogsDto {
  @ApiProperty({ description: POINT_LOG_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly userId: string;

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
