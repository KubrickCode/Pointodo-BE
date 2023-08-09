import { ApiProperty } from '@nestjs/swagger';
import { TASK_LOG_ID, TASK_TYPE_NAME } from '@shared/constants/task.constant';
import { DELETE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { TaskType_ } from '@task/domain/entities/task.entity';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class ReqDeleteTaskQueryDto {
  @ApiProperty({ description: TASK_LOG_ID })
  @Type(() => Number)
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: TASK_TYPE_NAME })
  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  readonly taskType: TaskType_;
}

export class ResDeleteTaskDto {
  @ApiProperty({
    example: DELETE_TASK_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
