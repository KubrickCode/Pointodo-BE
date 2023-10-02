import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskConstant } from '@shared/constants/Task.constant';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ReqUpdateTaskParamDto {
  @ApiProperty({ description: TaskConstant.TASK_LOG_ID })
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}

export class ReqUpdateTaskDto {
  @ApiProperty({ description: TaskConstant.TASK_NAME })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name?: string | null;

  @ApiProperty({ description: TaskConstant.TASK_DESC })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly description?: string | null;

  @ApiProperty({ description: TaskConstant.TASK_IMPORTANCE })
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  readonly importance?: number | null;

  @ApiProperty({ description: TaskConstant.TASK_DUE_DATE })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly dueDate?: string | null;

  @ApiProperty({ description: TaskConstant.TASK_COMPLETION })
  @Type(() => Number)
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  readonly completion?: number | null;
}
