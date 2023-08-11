import { ApiProperty } from '@nestjs/swagger';
import { TaskType_ } from '@task/domain/entities/task.entity';
import { IsInt, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { TASK_TYPE_NAME, TOTAL_PAGE } from '@shared/constants/task.constant';

export class ReqGetTotalTaskPagesParamDto {
  @ApiProperty({ description: TASK_TYPE_NAME })
  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  readonly taskType: TaskType_;
}

export class ResGetTotalTaskPagesDto {
  @ApiProperty({ description: TOTAL_PAGE })
  @IsInt()
  readonly totalPages: number;
}
