import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ReqUpdateTaskTypeParamDto {
  @ApiProperty({ description: '작업 타입 고유 ID' })
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}

export class ReqUpdateTaskTypeDto {
  @ApiProperty({ description: '새 작업 타입 ID' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  readonly newId: number;

  @ApiProperty({ description: '작업 타입 이름' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name: string;
}

export class ResUpdateTaskTypeDto {
  @ApiProperty({
    example: '작업 타입 업데이트 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}

export class ResUpdateTaskTypeConflict {
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
    example: '/api/admin/task/update',
    description: '요청 경로',
  })
  @IsString()
  readonly path: string;
}
