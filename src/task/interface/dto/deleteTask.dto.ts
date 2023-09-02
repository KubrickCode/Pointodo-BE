import { ApiProperty } from '@nestjs/swagger';
import { TASK_LOG_ID } from '@shared/constants/task.constant';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class ReqDeleteTaskParamDto {
  @ApiProperty({ description: TASK_LOG_ID })
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}
