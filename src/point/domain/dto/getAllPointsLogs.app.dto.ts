import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsInt, IsString } from 'class-validator';

export class ReqGetAllPointsLogsAppDto {
  @ApiProperty({ description: '유저 ID(UUID)' })
  @IsString()
  readonly userId: string;
}

export class ResGetAllPointsLogsAppDto {
  @ApiProperty({ description: '포인트 로그 고유 ID(INT)' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: '유저 ID(UUID)' })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: '작업 유형' })
  @IsInt()
  readonly taskType: string;

  @ApiProperty({ description: '포인트 작업 유형' })
  @IsEnum(['EARNED', 'SPENT'])
  readonly transactionType: 'EARNED' | 'SPENT';

  @ApiProperty({ description: '거래 포인트' })
  @IsInt()
  readonly points: number;

  @ApiProperty({ description: '포인트 로그 생성 시간' })
  @IsDate()
  readonly occurredAt: Date;
}
