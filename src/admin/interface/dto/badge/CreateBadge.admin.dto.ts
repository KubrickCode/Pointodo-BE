import {
  BadgeType_,
  BadgeTypes,
} from '@admin/badge/domain/entities/Badge.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BadgeConstant } from '@shared/constants/Badge.constant';
import { BadgeAdminErrorMessage } from '@shared/messages/admin/Badge.admin.errors';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class ReqAdminCreateBadgeDto {
  @ApiProperty({ description: BadgeConstant.BADGE_NAME })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: BadgeConstant.BADGE_DESC })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: BadgeConstant.BADGE_ICON_LINK })
  @IsString()
  readonly iconLink: string;

  @ApiProperty({ description: BadgeConstant.BADGE_TYPE })
  @IsEnum(BadgeTypes)
  readonly type: BadgeType_;

  @ApiProperty({ description: BadgeConstant.BADGE_PRICE })
  @ApiPropertyOptional()
  @IsOptional()
  readonly price?: number | null;
}
export class ResCreateBadgeConflict {
  @ApiProperty({ example: 409, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number;

  @ApiProperty({
    example: BadgeAdminErrorMessage.CONFLICT_BADGE_NAME,
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
