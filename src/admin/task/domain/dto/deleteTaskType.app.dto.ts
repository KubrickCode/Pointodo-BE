import { ApiProperty } from '@nestjs/swagger';
import { DELETE_TASK_TYPE_SUCCESS_MESSAGE } from '@shared/messages/admin/task.admin.message';
import { IsString } from 'class-validator';

export class ResDeleteTaskTypeAppDto {
  @ApiProperty({
    example: DELETE_TASK_TYPE_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
