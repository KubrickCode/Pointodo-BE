import { ApiProperty } from '@nestjs/swagger';
import { TaskConstant } from '@shared/constants/task.constant';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class ReqDeleteTaskParamDto {
  @ApiProperty({ description: TaskConstant.TASK_LOG_ID })
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}
