import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

class ReqUpdateBadgeTypeAppDto {
  @ApiProperty({ description: '뱃지 타입 고유 ID(SMALL INT)' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: '새 뱃지 ID' })
  @IsOptional()
  @IsInt()
  readonly newId: number;

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
  readonly iconLink: string;
}

class ResUpdateBadgeTypeAppDto {
  @ApiProperty({
    example: '뱃지 타입 업데이트 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}

export { ReqUpdateBadgeTypeAppDto, ResUpdateBadgeTypeAppDto };
