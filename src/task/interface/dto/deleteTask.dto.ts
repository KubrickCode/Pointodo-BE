import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class ReqDeleteTaskParamDto {
  @ApiProperty({ description: '작업 고유 ID(INT)' })
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}

export class ResDeleteTaskDto {
  @ApiProperty({
    example: '작업 삭제 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
