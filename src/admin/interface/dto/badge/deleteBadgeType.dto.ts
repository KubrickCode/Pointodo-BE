import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class ReqDeleteBadgeTypeParamDto {
  @ApiProperty({ description: '뱃지 타입 고유 ID' })
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}

export class ResDeleteBadgeTypeDto {
  @ApiProperty({
    example: '뱃지 타입 삭제 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
