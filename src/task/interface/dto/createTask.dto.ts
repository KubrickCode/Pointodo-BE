import { ApiProperty } from '@nestjs/swagger';
import { CREATE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { IsOptional, IsString } from 'class-validator';

export class ReqCreateTaskDto {
  @ApiProperty({ description: '작업 유형' })
  @IsString()
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
    example: CREATE_TASK_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
