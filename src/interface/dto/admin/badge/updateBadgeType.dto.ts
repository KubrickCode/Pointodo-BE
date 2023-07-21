import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

class ReqUpdateBadgeTypeParamDto {
  @ApiProperty({ description: '뱃지 타입 고유 ID' })
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}

class ReqUpdateBadgeTypeDto {
  @ApiProperty({ description: '뱃지 타입 이름' })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '뱃지 타입 설명' })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({ description: '뱃지 타입 아이콘' })
  @IsOptional()
  @IsString()
  readonly icon: string;
}

class ResUpdateBadgeTypeDto {
  @ApiProperty({
    example: '뱃지 타입 업데이트 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}

export {
  ReqUpdateBadgeTypeParamDto,
  ReqUpdateBadgeTypeDto,
  ResUpdateBadgeTypeDto,
};
