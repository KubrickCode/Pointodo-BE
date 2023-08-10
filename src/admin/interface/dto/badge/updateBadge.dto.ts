import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BADGE_ICON_LINK,
  BADGE_DESC,
  BADGE_ID,
  BADGE_NAME,
} from '@shared/constants/badge.constant';
import { CONFLICT_BADGE_NAME } from '@shared/messages/admin/badge.admin.errors';
import { UPDATE_BADGE_SUCCESS_MESSAGE } from '@shared/messages/admin/badge.admin.messages';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ReqUpdateBadgeParamDto {
  @ApiProperty({ description: BADGE_ID })
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}

export class ReqUpdateBadgeDto {
  @ApiProperty({ description: BADGE_NAME })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({ description: BADGE_DESC })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({ description: BADGE_ICON_LINK })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly iconLink?: string;
}

export class ResUpdateBadgeDto {
  @ApiProperty({
    example: UPDATE_BADGE_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}

export class ResUpdateBadgeConflict {
  @ApiProperty({ example: 409, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number;

  @ApiProperty({
    example: CONFLICT_BADGE_NAME,
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string;

  @ApiProperty({
    example: '/api/admin/badge/update',
    description: '요청 경로',
  })
  @IsString()
  readonly path: string;
}
