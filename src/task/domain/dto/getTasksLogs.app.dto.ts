import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsString } from 'class-validator';

export class ReqGetTasksLogsAppDto {
  @ApiProperty({ description: '작업 유저 ID(UUID)' })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: '작업 유형' })
  @IsInt()
  readonly taskType: string;
}

export class ResGetTasksLogsAppDto {
  @ApiProperty({ description: '작업 고유 ID(INT)' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: '작업 유저 ID(UUID)' })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: '작업 유형' })
  @IsInt()
  readonly taskType: string;

  @ApiProperty({ description: '작업 이름' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '작업 설명' })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: '작업 완료 여부' })
  @IsInt()
  readonly completion: number;

  @ApiProperty({ description: '작업 중요도' })
  @IsInt()
  readonly importance: number;

  @ApiProperty({ description: '작업 생성 시간' })
  @IsDate()
  readonly occurredAt: Date;
}
