import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt } from 'class-validator';
import {
  POINTS_LOGS_LIMIT,
  POINT_TRANSACTION_TYPE,
} from '@shared/constants/point.constant';
import { TOTAL_PAGE } from '@shared/constants/global.constant';
import { Type } from 'class-transformer';
import {
  POINT_LOG_TRANSACTION_TYPE,
  POINT_LOG_TRANSACTION_TYPES,
} from '@point/domain/entities/pointsLog.entity';

export class ReqGetTotalPointPagesQueryDto {
  @ApiProperty({ description: POINT_TRANSACTION_TYPE })
  @IsIn(POINT_LOG_TRANSACTION_TYPES)
  readonly transactionType: POINT_LOG_TRANSACTION_TYPE;

  @ApiProperty({ description: POINTS_LOGS_LIMIT })
  @Type(() => Number)
  @IsInt()
  readonly limit: number;
}

export class ResGetTotalPointPagesDto {
  @ApiProperty({ description: TOTAL_PAGE })
  @IsInt()
  readonly totalPages: number;
}
