import { ApiProperty } from '@nestjs/swagger';
import { CANCLE_TASK_COMPLETION_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class ReqCancleTaskCompletionParamDto {
  @ApiProperty({ description: '작업 고유 ID(INT)' })
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
