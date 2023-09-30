import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GlobalConstant } from '@shared/constants/global.constant';
import { TaskConstant } from '@shared/constants/task.constant';
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
  @ApiProperty({ description: TaskConstant.TASK_TYPE_NAME })
  @IsEnum(TaskTypes)
  @Transform(({ value }) => value.toUpperCase())
  readonly taskType: TaskType_;

  @ApiProperty({ description: TaskConstant.TASK_PAGE })
  @Type(() => Number)
  @IsInt()
  readonly offset: number;

  @ApiProperty({ description: TaskConstant.TASK_LIMIT })
  @Type(() => Number)
  @IsInt()
  readonly limit: number;

  @ApiProperty({ description: GlobalConstant.ORDER_BY })
  @IsIn(TASK_ORDER_TYPES)
  readonly order: TASK_ORDER_TYPE;

  @ApiProperty({ description: TaskConstant.TASK_VISIBLE_BY_COMPLETION })
  @IsIn(TASK_VISIBLE_BY_COMPLETION_TYPES)
  readonly completion: TASK_VISIBLE_BY_COMPLETION_TYPE;
}

export class ResGetTasksLogsDto {
  @ApiProperty({ description: TaskConstant.TASK_LOG_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: TaskConstant.TASK_TYPE_NAME })
  @IsInt()
  readonly taskType: TaskType_;

  @ApiProperty({ description: TaskConstant.TASK_NAME })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: TaskConstant.TASK_DESC })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: TaskConstant.TASK_COMPLETION })
  @IsInt()
  readonly completion: number;

  @ApiProperty({ description: TaskConstant.TASK_IMPORTANCE })
  @IsInt()
  readonly importance: number;

  @ApiProperty({ description: TaskConstant.TASK_OCCURRED_AT })
  @IsDate()
  readonly occurredAt: Date;

  @ApiProperty({ description: TaskConstant.TASK_DUE_DATE })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly dueDate?: string | null;
}
