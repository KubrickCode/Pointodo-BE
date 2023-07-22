import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

class ReqCreateBadgeTypeDto {
  @ApiProperty({ description: '뱃지 타입 고유 ID(SMALL INT)' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: '뱃지 타입 이름' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '뱃지 타입 설명' })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: '뱃지 타입 아이콘' })
  @IsString()
  readonly icon: string;
}

class ResCreateBadgeTypeDto {
  @ApiProperty({ example: '뱃지 타입 생성 성공', description: '성공 메시지' })
  @IsString()
  readonly message: string;
}

class ResCreateBadgeTypeConflict {
  @ApiProperty({ example: 409, description: '에러 상태 코드' })
  @IsString()
  readonly statusCode: number;

  @ApiProperty({
    example: '이미 존재하는 ID 혹은 뱃지 이름',
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string;

  @ApiProperty({
    example: '/api/admin/badge/create',
    description: '요청 경로',
  })
  @IsString()
  readonly path: string;
}

export {
  ReqCreateBadgeTypeDto,
  ResCreateBadgeTypeDto,
  ResCreateBadgeTypeConflict,
};
