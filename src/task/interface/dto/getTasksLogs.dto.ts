import { ApiProperty } from '@nestjs/swagger';
import {
  TASK_COMPLETION,
  TASK_DESC,
  TASK_DUE_DATE,
  TASK_IMPORTANCE,
  TASK_LOG_ID,
  TASK_NAME,
  TASK_OCCURRED_AT,
  TASK_TYPE_NAME,
} from '@shared/constants/task.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class ReqGetTasksLogsParamDto {
  @ApiProperty({ description: TASK_TYPE_NAME })
  @IsString()
  @Transform(({ value }) => {
    switch (value) {
      case 'daily':
        return '매일 작업';
      case 'due':
        return '기한 작업';
      case 'free':
        return '무기한 작업';
      default:
        return value;
    }
  })
  readonly taskType: string;
}

export class ResGetTasksLogsDto {
  @ApiProperty({ description: TASK_LOG_ID })
  @IsInt()
  readonly id: number;

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
  readonly description: string;

  @ApiProperty({ description: TASK_COMPLETION })
  @IsInt()
  readonly completion: number;

  @ApiProperty({ description: TASK_IMPORTANCE })
  @IsInt()
  readonly importance: number;

  @ApiProperty({ description: TASK_OCCURRED_AT })
  @IsDate()
  readonly occurredAt: Date;

  @ApiProperty({ description: TASK_DUE_DATE })
  @IsString()
  @IsOptional()
  readonly dueDate?: string;
}
