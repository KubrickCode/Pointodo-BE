import { ApiProperty } from '@nestjs/swagger';
import { DELETE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class ReqDeleteTaskParamDto {
  @ApiProperty({ description: '작업 고유 ID(INT)' })
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}

export class ResDeleteTaskDto {
  @ApiProperty({
    example: DELETE_TASK_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
