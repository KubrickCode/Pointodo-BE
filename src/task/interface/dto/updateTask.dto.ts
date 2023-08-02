import { ApiProperty } from '@nestjs/swagger';
import { UPDATE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ReqUpdateTaskDto {
  @ApiProperty({ description: '작업 고유 ID(INT)' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: '작업 이름' })
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiProperty({ description: '작업 설명' })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({ description: '작업 중요도' })
  @IsInt()
  @IsOptional()
  readonly importance: number;
}

export class ResUpdateTaskDto {
  @ApiProperty({
    example: UPDATE_TASK_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
