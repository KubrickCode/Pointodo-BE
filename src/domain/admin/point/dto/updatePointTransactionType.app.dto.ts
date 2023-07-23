import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

class ReqUpdatePointTransactionTypeAppDto {
  @ApiProperty({ description: '포인트 거래 타입 고유 ID(SMALL INT)' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: '새 포인트 거래 ID' })
  @IsOptional()
  @IsInt()
  readonly newId: number;

  @ApiProperty({ description: '포인트 거래 타입 이름' })
  @IsOptional()
  @IsString()
  readonly name: string;
}

class ResUpdatePointTransactionTypeAppDto {
  @ApiProperty({
    example: '포인트 거래 타입 업데이트 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}

export {
  ReqUpdatePointTransactionTypeAppDto,
  ResUpdatePointTransactionTypeAppDto,
};