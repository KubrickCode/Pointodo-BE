import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TASK_TYPE_ID, TASK_TYPE_NAME } from '@shared/constants/task.constant';
import { UPDATE_TASK_TYPE_SUCCESS_MESSAGE } from '@shared/messages/admin/task.admin.message';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ReqUpdateTaskTypeAppDto {
  @ApiProperty({ description: TASK_TYPE_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: TASK_TYPE_NAME })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name: string;
}

export class ResUpdateTaskTypeAppDto {
  @ApiProperty({
    example: UPDATE_TASK_TYPE_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
