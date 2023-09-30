import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskConstant } from '@shared/constants/task.constant';
import { TaskType_ } from '@task/domain/entities/task.entity';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ReqCreateTaskDto {
  @ApiProperty({ description: TaskConstant.TASK_TYPE_NAME })
  @IsString()
  readonly taskType: TaskType_;

  @ApiProperty({ description: TaskConstant.TASK_NAME })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: TaskConstant.TASK_DESC })
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  readonly description?: string | null;

  @ApiProperty({ description: TaskConstant.TASK_IMPORTANCE })
  @Type(() => Number)
  @IsInt()
  readonly importance: number;

  @ApiProperty({ description: TaskConstant.TASK_DUE_DATE })
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  readonly dueDate?: string | null;
}
