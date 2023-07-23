import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

class ReqUpdatePointTransactionTypeParamDto {
  @ApiProperty({ description: '포인트 거래 타입 고유 ID' })
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}

class ReqUpdatePointTransactionTypeDto {
  @ApiProperty({ description: '새 포인트 거래 타입 ID' })
  @IsOptional()
  @IsInt()
  readonly newId: number;

  @ApiProperty({ description: '포인트 거래 타입 이름' })
  @IsOptional()
  @IsString()
  readonly name: string;
}

class ResUpdatePointTransactionTypeDto {
  @ApiProperty({
    example: '포인트 거래 타입 업데이트 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}

class ResUpdatePointTransactionTypeConflict {
  @ApiProperty({ example: 409, description: '에러 상태 코드' })
  @IsString()
  readonly statusCode: number;

  @ApiProperty({
    example: '이미 존재하는 ID 혹은 포인트 거래 타입 이름',
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string;

  @ApiProperty({
    example: '/api/admin/point/update',
    description: '요청 경로',
  })
  @IsString()
  readonly path: string;
}

export {
  ReqUpdatePointTransactionTypeParamDto,
  ReqUpdatePointTransactionTypeDto,
  ResUpdatePointTransactionTypeDto,
  ResUpdatePointTransactionTypeConflict,
};