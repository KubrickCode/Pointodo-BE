import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import { POINT_TRANSACTION_TYPE } from '@shared/constants/point.constant';
import { TOTAL_PAGE } from '@shared/constants/global.constant';
import { Transform } from 'class-transformer';

export class ReqGetTotalPointPagesParamDto {
  @ApiProperty({ description: POINT_TRANSACTION_TYPE })
  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(['EARNED', 'SPENT'])
  readonly transactionType: 'EARNED' | 'SPENT';
}

export class ResGetTotalPointPagesDto {
  @ApiProperty({ description: TOTAL_PAGE })
  @IsInt()
  readonly totalPages: number;
}
