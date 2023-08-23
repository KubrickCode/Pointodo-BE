import { ApiProperty } from '@nestjs/swagger';
import { ORDER_BY } from '@shared/constants/global.constant';
import {
  USER_EMAIL,
  USER_EMAIL_EXAMPLE,
  USER_ID,
  USER_LIST_PAGE,
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
  ProviderTypesWithAll,
  RoleType,
  RoleTypes,
} from '@user/domain/entities/user.entity';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsString } from 'class-validator';

export class ReqAdminGetUserListQueryDto {
  @ApiProperty({ description: USER_LIST_PAGE })
  @Type(() => Number)
  @IsInt()
  readonly page: number;

  @ApiProperty({ description: ORDER_BY })
  @IsString()
  readonly order: string;

  @ApiProperty({ description: USER_PROVIDER })
  @IsEnum(ProviderTypesWithAll)
  @Transform(({ value }) => value.toUpperCase())
  readonly provider: ProviderType | 'ALL';
}

export class ResAdminGetUserListDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly id: string;

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

  @IsDate()
  @ApiProperty({ description: USER_REGISTER_DATE })
  readonly createdAt: Date;
}
