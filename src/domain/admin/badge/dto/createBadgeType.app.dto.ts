import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

class ReqCreateBadgeTypeAppDto {
  @ApiProperty({ description: '뱃지 타입 고유 ID(SMALL INT)' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: '뱃지 타입 이름' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '뱃지 타입 설명' })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: '뱃지 타입 아이콘' })
  @IsString()
  readonly icon: string;
}

class ResCreateBadgeTypeAppDto {
  @ApiProperty({ example: '뱃지 타입 생성 성공', description: '성공 메시지' })
  @IsString()
  readonly message: string;
}

export { ReqCreateBadgeTypeAppDto, ResCreateBadgeTypeAppDto };
