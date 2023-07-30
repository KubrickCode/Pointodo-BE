import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class ReqCreateTaskDto {
  @ApiProperty({ description: '작업 유형' })
  @IsString()
  @Transform(({ value }) => {
    switch (value) {
      case 'daily':
        return '매일 작업';
      case 'deadline':
        return '기한 작업';
      case 'free':
        return '무기한 작업';
      default:
        return value;
    }
  })
  readonly taskType: string;

  @ApiProperty({ description: '작업 이름' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '작업 설명' })
  @IsString()
  @IsOptional()
  readonly description: string;
}

export class ResCreateTaskDto {
  @ApiProperty({
    example: '작업 생성 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
