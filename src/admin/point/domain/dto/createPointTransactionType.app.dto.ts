import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

class ReqCreatePointTransactionTypeAppDto {
  @ApiProperty({ description: '포인트 거래 타입 고유 ID(SMALL INT)' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: '포인트 거래 타입 이름' })
  @IsString()
  readonly name: string;
}

class ResCreatePointTransactionTypeAppDto {
  @ApiProperty({
    example: '포인트 거래 타입 생성 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}

export {
  ReqCreatePointTransactionTypeAppDto,
  ResCreatePointTransactionTypeAppDto,
};
