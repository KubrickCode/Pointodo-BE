import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  TASK_DESC,
  TASK_DUE_DATE,
  TASK_IMPORTANCE,
  TASK_NAME,
  TASK_TYPE_NAME,
} from '@shared/constants/task.constant';
import { TaskType_ } from '@task/domain/entities/task.entity';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ReqCreateTaskDto {
  @ApiProperty({ description: TASK_TYPE_NAME })
  @IsString()
  readonly taskType: TaskType_;

  @ApiProperty({ description: TASK_NAME })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: TASK_DESC })
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  readonly description?: string | null;

  @ApiProperty({ description: TASK_IMPORTANCE })
  @Type(() => Number)
  @IsInt()
  readonly importance: number;

  @ApiProperty({ description: TASK_DUE_DATE })
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  readonly dueDate?: string | null;
}
