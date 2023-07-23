import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

class ReqCreateTaskTypeDto {
  @ApiProperty({ description: '작업 타입 고유 ID(SMALL INT)' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: '작업 타입 이름' })
  @IsString()
  readonly name: string;
}

class ResCreateTaskTypeDto {
  @ApiProperty({
    example: '작업 타입 생성 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}

class ResCreateTaskTypeConflict {
  @ApiProperty({ example: 409, description: '에러 상태 코드' })
  @IsString()
  readonly statusCode: number;

  @ApiProperty({
    example: '이미 존재하는 ID 혹은 작업 타입 이름',
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string;

  @ApiProperty({
    example: '/api/admin/task/create',
    description: '요청 경로',
  })
  @IsString()
  readonly path: string;
}

export {
  ReqCreateTaskTypeDto,
  ResCreateTaskTypeDto,
  ResCreateTaskTypeConflict,
};
