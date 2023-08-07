import { ApiProperty } from '@nestjs/swagger';
import { TASK_TYPE_NAME } from '@shared/constants/task.constant';
import { CREATE_TASK_TYPE_SUCCESS_MESSAGE } from '@shared/messages/admin/task.admin.message';
import { IsString } from 'class-validator';

export class ReqCreateTaskTypeAppDto {
  @ApiProperty({ description: TASK_TYPE_NAME })
  @IsString()
  readonly name: string;
}

export class ResCreateTaskTypeAppDto {
  @ApiProperty({
    example: CREATE_TASK_TYPE_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
