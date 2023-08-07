import { ApiProperty } from '@nestjs/swagger';
import {
  TASK_DESC,
  TASK_IMPORTANCE,
  TASK_NAME,
  TASK_TYPE_NAME,
} from '@shared/constants/task.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { CREATE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ReqCreateTaskAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: TASK_TYPE_NAME })
  @IsInt()
  readonly taskType: string;

  @ApiProperty({ description: TASK_NAME })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: TASK_DESC })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({ description: TASK_IMPORTANCE })
  @IsInt()
  readonly importance: number;
}

export class ResCreateTaskAppDto {
  @ApiProperty({
    example: CREATE_TASK_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
