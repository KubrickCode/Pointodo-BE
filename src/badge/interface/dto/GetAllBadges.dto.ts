import {
  BadgeType_,
  BadgeTypes,
} from '@admin/badge/domain/entities/Badge.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BadgeConstant } from '@shared/constants/Badge.constant';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class ResGetAllBadgesDto {
  @ApiProperty({ description: BadgeConstant.BADGE_ID })
  @IsInt()
  readonly id: number;

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
  @IsInt()
  readonly price?: number | null;
}
