import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import {
  POINTS_LOGS_LIMIT,
  POINT_TRANSACTION_TYPE,
} from '@shared/constants/point.constant';
import { TOTAL_PAGE } from '@shared/constants/global.constant';
import { Transform, Type } from 'class-transformer';

export class ReqGetTotalPointPagesQueryDto {
  @ApiProperty({ description: POINT_TRANSACTION_TYPE })
  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(['EARNED', 'SPENT'])
  readonly transactionType: 'EARNED' | 'SPENT';

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
