import { ApiProperty } from '@nestjs/swagger';
import { TASK_LOG_ID } from '@shared/constants/task.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { COMPLETE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { IsInt, IsString } from 'class-validator';

export class ReqCompleteTaskAppDto {
  @ApiProperty({ description: TASK_LOG_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly userId: string;
}

export class ResCompleteTaskAppDto {
  @ApiProperty({
    example: COMPLETE_TASK_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
