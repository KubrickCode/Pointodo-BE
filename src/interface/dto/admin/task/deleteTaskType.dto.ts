import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

class ReqDeleteTaskTypeParamDto {
  @ApiProperty({ description: '작업 타입 고유 ID' })
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}

class ResDeleteTaskTypeDto {
  @ApiProperty({
    example: '작업 타입 삭제 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}

export { ReqDeleteTaskTypeParamDto, ResDeleteTaskTypeDto };
