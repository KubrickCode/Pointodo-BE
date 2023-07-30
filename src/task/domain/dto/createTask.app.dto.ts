import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ReqCreateTaskAppDto {
  @ApiProperty({ description: '작업 유저 ID(UUID)' })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: '작업 유형' })
  @IsInt()
  readonly taskType: string;

  @ApiProperty({ description: '작업 이름' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '작업 설명' })
  @IsString()
  @IsOptional()
  readonly description: string;
}

export class ResCreateTaskAppDto {
  @ApiProperty({
    example: '작업 생성 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
