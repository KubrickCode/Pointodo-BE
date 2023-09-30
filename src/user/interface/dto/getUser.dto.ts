import { ApiProperty } from '@nestjs/swagger';
import { BadgeConstant } from '@shared/constants/badge.constant';
import { UserConstant } from '@shared/constants/user.constant';
import {
  ProviderType,
  ProviderTypes,
  RoleType,
  RoleTypes,
} from '@user/domain/entities/user.entity';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsString } from 'class-validator';

export class ResGetUserDto {
  @ApiProperty({
    example: UserConstant.USER_EMAIL_EXAMPLE,
    description: UserConstant.USER_EMAIL,
  })
  @IsString()
  readonly email: string;

  @ApiProperty({
    example: UserConstant.USER_PROVIDER_EXAMPLE,
    description: UserConstant.USER_PROVIDER,
  })
  @IsEnum(ProviderTypes)
  readonly provider: ProviderType;

  @ApiProperty({
    example: UserConstant.USER_ROLE_EXAMPLE,
    description: UserConstant.USER_ROLE,
  })
  @IsEnum(RoleTypes)
  readonly role: RoleType;

  @ApiProperty({ description: UserConstant.USER_SELECTED_BADGE_ID })
  @IsInt()
  readonly selectedBadgeId: number;

  @ApiProperty({ description: UserConstant.USER_REGISTER_DATE })
  @Type(() => Date)
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty({ description: BadgeConstant.BADGE_ICON_LINK })
  @IsString()
  readonly iconLink: string;
}
