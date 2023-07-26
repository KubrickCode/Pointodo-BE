import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ResGetAllPointTransactionTypesDto {
  @ApiProperty({ description: '포인트 거래 타입 고유 ID(SMALL INT)' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: '포인트 거래 타입 이름' })
  @IsString()
  readonly name: string;
}
