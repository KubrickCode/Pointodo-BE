import { ApiProperty } from '@nestjs/swagger';
import { BADGE_ICON_LINK } from '@shared/constants/badge.constant';
import {
  USER_EMAIL,
  USER_EMAIL_EXAMPLE,
  USER_ID,
  USER_PROVIDER,
  USER_PROVIDER_EXAMPLE,
  USER_REGISTER_DATE,
  USER_ROLE,
  USER_ROLE_EXAMPLE,
  USER_SELECTED_BADGE_ID,
} from '@shared/constants/user.constant';
import {
  ProviderType,
  ProviderTypes,
  RoleType,
  RoleTypes,
} from '@user/domain/entities/user.entity';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsObject, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ResGetUserDto {
  @ApiProperty({ description: USER_ID })
  @IsUUID()
  readonly id: UUID;

  @ApiProperty({ example: USER_EMAIL_EXAMPLE, description: USER_EMAIL })
  @IsString()
  readonly email: string;

  @ApiProperty({ example: USER_PROVIDER_EXAMPLE, description: USER_PROVIDER })
  @IsEnum(ProviderTypes)
  readonly provider: ProviderType;

  @ApiProperty({ example: USER_ROLE_EXAMPLE, description: USER_ROLE })
  @IsEnum(RoleTypes)
  readonly role: RoleType;

  @ApiProperty({ description: USER_SELECTED_BADGE_ID })
  @IsString()
  readonly selectedBadgeId: number;

  @ApiProperty({ description: USER_REGISTER_DATE })
  @Type(() => Date)
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty({ description: BADGE_ICON_LINK })
  @IsObject()
  readonly selectedBadge: { iconLink: string };
}
