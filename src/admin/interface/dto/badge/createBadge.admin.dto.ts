import {
  BadgeType_,
  BadgeTypes,
} from '@admin/badge/domain/entities/badge.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BADGE_ICON_LINK,
  BADGE_DESC,
  BADGE_NAME,
  BADGE_TYPE,
  BADGE_PRICE,
} from '@shared/constants/badge.constant';
import { CONFLICT_BADGE_NAME } from '@shared/messages/admin/badge.admin.errors';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class ReqAdminCreateBadgeDto {
  @ApiProperty({ description: BADGE_NAME })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: BADGE_DESC })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: BADGE_ICON_LINK })
  @IsString()
  readonly iconLink: string;

  @ApiProperty({ description: BADGE_TYPE })
  @IsEnum(BadgeTypes)
  readonly type: BadgeType_;

  @ApiProperty({ description: BADGE_PRICE })
  @ApiPropertyOptional()
  @IsOptional()
  readonly price?: number | null;
}
export class ResCreateBadgeConflict {
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
    example: '/api/admin/badge/create',
    description: '요청 경로',
  })
  @IsString()
  readonly path: string;
}
