import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  TASK_DESC,
  TASK_DUE_DATE,
  TASK_IMPORTANCE,
  TASK_LOG_ID,
  TASK_NAME,
} from '@shared/constants/task.constant';
import { UPDATE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ReqUpdateTaskDto {
  @ApiProperty({ description: TASK_LOG_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: TASK_NAME })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name?: string | null;

  @ApiProperty({ description: TASK_DESC })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly description?: string | null;

  @ApiProperty({ description: TASK_IMPORTANCE })
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  readonly importance?: number | null;

  @ApiProperty({ description: TASK_DUE_DATE })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly dueDate?: string | null;
}

export class ResUpdateTaskDto {
  @ApiProperty({
    example: UPDATE_TASK_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
