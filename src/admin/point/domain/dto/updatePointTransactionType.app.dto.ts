import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ReqUpdatePointTransactionTypeAppDto {
  @ApiProperty({ description: '포인트 거래 타입 고유 ID(SMALL INT)' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: '새 포인트 거래 ID' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  readonly newId: number;

  @ApiProperty({ description: '포인트 거래 타입 이름' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name: string;
}

export class ResUpdatePointTransactionTypeAppDto {
  @ApiProperty({
    example: '포인트 거래 타입 업데이트 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
