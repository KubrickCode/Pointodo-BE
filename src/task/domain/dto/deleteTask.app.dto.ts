import { ApiProperty } from '@nestjs/swagger';
import { TASK_LOG_ID } from '@shared/constants/task.constant';
import { DELETE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { IsInt, IsString } from 'class-validator';

export class ReqDeleteTaskAppDto {
  @ApiProperty({ description: TASK_LOG_ID })
  @IsInt()
  readonly id: number;
}

export class ResDeleteTaskAppDto {
  @ApiProperty({
    example: DELETE_TASK_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
