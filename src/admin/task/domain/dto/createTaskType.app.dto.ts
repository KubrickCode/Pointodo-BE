import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ReqCreateTaskTypeAppDto {
  @ApiProperty({ description: '작업 타입 고유 ID(SMALL INT)' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: '작업 타입 이름' })
  @IsString()
  readonly name: string;
}

export class ResCreateTaskTypeAppDto {
  @ApiProperty({
    example: '작업 타입 생성 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
