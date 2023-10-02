import { ApiProperty } from '@nestjs/swagger';
import {
  TASK_VISIBLE_BY_COMPLETION_TYPE,
  TASK_VISIBLE_BY_COMPLETION_TYPES,
  TaskType_,
} from '@task/domain/entities/Task.entity';
import { IsIn, IsInt, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TaskConstant } from '@shared/constants/Task.constant';
import { GlobalConstant } from '@shared/constants/Global.constant';

export class ReqGetTotalTaskPagesQueryDto {
  @ApiProperty({ description: TaskConstant.TASK_TYPE_NAME })
  @Transform(({ value }) => value.toUpperCase())
  @IsString()
  readonly taskType: TaskType_;

  @ApiProperty({ description: TaskConstant.TASK_LIMIT })
  @Type(() => Number)
  @IsInt()
  readonly limit: number;

  @ApiProperty({ description: TaskConstant.TASK_VISIBLE_BY_COMPLETION })
  @IsIn(TASK_VISIBLE_BY_COMPLETION_TYPES)
  readonly completion: TASK_VISIBLE_BY_COMPLETION_TYPE;
}

export class ResGetTotalTaskPagesDto {
  @ApiProperty({ description: GlobalConstant.TOTAL_PAGE })
  @IsInt()
  readonly totalPages: number;
}
