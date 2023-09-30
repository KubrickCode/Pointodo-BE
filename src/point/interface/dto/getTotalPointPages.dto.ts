import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt } from 'class-validator';
import { PointConstant } from '@shared/constants/point.constant';
import { GlobalConstant } from '@shared/constants/global.constant';
import { Type } from 'class-transformer';
import {
  POINT_LOG_TRANSACTION_TYPE,
  POINT_LOG_TRANSACTION_TYPES,
} from '@point/domain/entities/pointsLog.entity';

export class ReqGetTotalPointPagesQueryDto {
  @ApiProperty({ description: PointConstant.POINT_TRANSACTION_TYPE })
  @IsIn(POINT_LOG_TRANSACTION_TYPES)
  readonly transactionType: POINT_LOG_TRANSACTION_TYPE;

  @ApiProperty({ description: PointConstant.POINTS_LOGS_LIMIT })
  @Type(() => Number)
  @IsInt()
  readonly limit: number;
}

export class ResGetTotalPointPagesDto {
  @ApiProperty({ description: GlobalConstant.TOTAL_PAGE })
  @IsInt()
  readonly totalPages: number;
}
