import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ORDER_BY } from '@shared/constants/global.constant';
import {
  TASK_COMPLETION,
  TASK_DESC,
  TASK_DUE_DATE,
  TASK_IMPORTANCE,
  TASK_LIMIT,
  TASK_LOG_ID,
  TASK_NAME,
  TASK_OCCURRED_AT,
  TASK_PAGE,
  TASK_TYPE_NAME,
  TASK_VISIBLE_BY_COMPLETION,
} from '@shared/constants/task.constant';
import {
  TASK_ORDER_TYPE,
  TASK_ORDER_TYPES,
  TASK_VISIBLE_BY_COMPLETION_TYPE,
  TASK_VISIBLE_BY_COMPLETION_TYPES,
  TaskType_,
  TaskTypes,
} from '@task/domain/entities/task.entity';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class ReqGetTasksLogsQueryDto {
  @ApiProperty({ description: TASK_TYPE_NAME })
  @IsEnum(TaskTypes)
  @Transform(({ value }) => value.toUpperCase())
  readonly taskType: TaskType_;

  @ApiProperty({ description: TASK_PAGE })
  @Type(() => Number)
  @IsInt()
  readonly offset: number;

  @ApiProperty({ description: TASK_LIMIT })
  @Type(() => Number)
  @IsInt()
  readonly limit: number;

  @ApiProperty({ description: ORDER_BY })
  @IsIn(TASK_ORDER_TYPES)
  readonly order: TASK_ORDER_TYPE;

  @ApiProperty({ description: TASK_VISIBLE_BY_COMPLETION })
  @IsIn(TASK_VISIBLE_BY_COMPLETION_TYPES)
  readonly completion: TASK_VISIBLE_BY_COMPLETION_TYPE;
}

export class ResGetTasksLogsDto {
  @ApiProperty({ description: TASK_LOG_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: TASK_TYPE_NAME })
  @IsInt()
  readonly taskType: TaskType_;

  @ApiProperty({ description: TASK_NAME })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: TASK_DESC })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: TASK_COMPLETION })
  @IsInt()
  readonly completion: number;

  @ApiProperty({ description: TASK_IMPORTANCE })
  @IsInt()
  readonly importance: number;

  @ApiProperty({ description: TASK_OCCURRED_AT })
  @IsDate()
  readonly occurredAt: Date;

  @ApiProperty({ description: TASK_DUE_DATE })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly dueDate?: string | null;
}
