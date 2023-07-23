import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

class ReqDeletePointTransactionTypeParamDto {
  @ApiProperty({ description: '포인트 거래 타입 고유 ID' })
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}

class ResDeletePointTransactionTypeDto {
  @ApiProperty({
    example: '포인트 거래 타입 삭제 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}

export {
  ReqDeletePointTransactionTypeParamDto,
  ResDeletePointTransactionTypeDto,
};
