import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsString } from 'class-validator';

export class ReqGetTasksLogsParamDto {
  @ApiProperty({ description: '작업 유형' })
  @IsString()
  @Transform(({ value }) => {
    switch (value) {
      case 'daily':
        return '매일 작업';
      case 'deadline':
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
  @ApiProperty({ description: '작업 고유 ID(INT)' })
  @IsInt()
  id: number;

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
  completion: number;

  @ApiProperty({ description: '작업 중요도' })
  @IsInt()
  importance: number;

  @ApiProperty({ description: '작업 생성 시간' })
  @IsDate()
  occurredAt: Date;
}
