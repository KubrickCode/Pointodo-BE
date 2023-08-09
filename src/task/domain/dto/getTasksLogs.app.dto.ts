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
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class ReqGetTasksLogsAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: TASK_TYPE_NAME })
  @IsInt()
  readonly taskType: string;
}

export class ResGetTasksLogsAppDto {
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
