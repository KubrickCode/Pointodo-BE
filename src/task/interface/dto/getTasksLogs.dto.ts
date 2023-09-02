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
} from '@shared/constants/task.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { TaskType_ } from '@task/domain/entities/task.entity';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ReqGetTasksLogsQueryDto {
  @ApiProperty({ description: TASK_TYPE_NAME })
  @IsString()
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
  @IsString()
  readonly order: string;
}

export class ResGetTasksLogsDto {
  @ApiProperty({ description: TASK_LOG_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: USER_ID })
  @IsUUID()
  readonly userId: UUID;

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
