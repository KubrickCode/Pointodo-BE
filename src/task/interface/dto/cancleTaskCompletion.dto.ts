import { ApiProperty } from '@nestjs/swagger';
import { TASK_LOG_ID } from '@shared/constants/task.constant';
import { CANCLE_TASK_COMPLETION_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class ReqCancleTaskCompletionParamDto {
  @ApiProperty({ description: TASK_LOG_ID })
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}

export class ResCancleTaskCompletionDto {
  @ApiProperty({
    example: CANCLE_TASK_COMPLETION_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
