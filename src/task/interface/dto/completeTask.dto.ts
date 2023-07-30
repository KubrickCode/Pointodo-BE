import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class ReqCompleteTaskParamDto {
  @ApiProperty({ description: '작업 고유 ID(INT)' })
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}

export class ResCompleteTaskDto {
  @ApiProperty({
    example: '작업 완료 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
