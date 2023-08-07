import { ApiProperty } from '@nestjs/swagger';
import {
  TASK_DESC,
  TASK_IMPORTANCE,
  TASK_LOG_ID,
  TASK_NAME,
} from '@shared/constants/task.constant';
import { UPDATE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ReqUpdateTaskDto {
  @ApiProperty({ description: TASK_LOG_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: TASK_NAME })
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiProperty({ description: TASK_DESC })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({ description: TASK_IMPORTANCE })
  @IsInt()
  @IsOptional()
  readonly importance: number;
}

export class ResUpdateTaskDto {
  @ApiProperty({
    example: UPDATE_TASK_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
