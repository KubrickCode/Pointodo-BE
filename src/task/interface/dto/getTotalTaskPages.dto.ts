import { ApiProperty } from '@nestjs/swagger';
import {
  TASK_VISIBLE_BY_COMPLETION_TYPE,
  TASK_VISIBLE_BY_COMPLETION_TYPES,
  TaskType_,
} from '@task/domain/entities/task.entity';
import { IsIn, IsInt, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  TASK_LIMIT,
  TASK_TYPE_NAME,
  TASK_VISIBLE_BY_COMPLETION,
} from '@shared/constants/task.constant';
import { TOTAL_PAGE } from '@shared/constants/global.constant';

export class ReqGetTotalTaskPagesQueryDto {
  @ApiProperty({ description: TASK_TYPE_NAME })
  @Transform(({ value }) => value.toUpperCase())
  @IsString()
  readonly taskType: TaskType_;

  @ApiProperty({ description: TASK_LIMIT })
  @Type(() => Number)
  @IsInt()
  readonly limit: number;

  @ApiProperty({ description: TASK_VISIBLE_BY_COMPLETION })
  @IsIn(TASK_VISIBLE_BY_COMPLETION_TYPES)
  readonly completion: TASK_VISIBLE_BY_COMPLETION_TYPE;
}

export class ResGetTotalTaskPagesDto {
  @ApiProperty({ description: TOTAL_PAGE })
  @IsInt()
  readonly totalPages: number;
}
