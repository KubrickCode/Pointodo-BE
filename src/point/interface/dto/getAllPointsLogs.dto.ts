import { ApiProperty } from '@nestjs/swagger';
import {
  POINTS,
  POINT_LOG_ID,
  POINT_LOG_OCCURRED_AT,
  POINT_TRANSACTION_TYPE,
} from '@shared/constants/point.constant';
import { TASK_TYPE_NAME } from '@shared/constants/task.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { IsDate, IsEnum, IsInt, IsString } from 'class-validator';

export class ResGetAllPointsLogsDto {
  @ApiProperty({ description: POINT_LOG_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: TASK_TYPE_NAME })
  @IsInt()
  readonly taskType: string;

  @ApiProperty({ description: POINT_TRANSACTION_TYPE })
  @IsEnum(['EARNED', 'SPENT'])
  readonly transactionType: 'EARNED' | 'SPENT';

  @ApiProperty({ description: POINTS })
  @IsInt()
  readonly points: number;

  @ApiProperty({ description: POINT_LOG_OCCURRED_AT })
  @IsDate()
  readonly occurredAt: Date;
}
