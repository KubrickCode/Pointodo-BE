import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ReqCreatePointTransactionTypeDto {
  @ApiProperty({ description: '포인트 거래 타입 고유 ID(SMALL INT)' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: '포인트 거래 타입 이름' })
  @IsString()
  readonly name: string;
}

export class ResCreatePointTransactionTypeDto {
  @ApiProperty({
    example: '포인트 거래 타입 생성 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}

export class ResCreatePointTransactionTypeConflict {
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
    example: '/api/admin/point/create',
    description: '요청 경로',
  })
  @IsString()
  readonly path: string;
}
