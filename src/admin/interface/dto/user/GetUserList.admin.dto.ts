import { ApiProperty } from '@nestjs/swagger';
import { GlobalConstant } from '@shared/constants/Global.constant';
import { UserConstant } from '@shared/constants/User.constant';
import {
  ProviderType,
  ProviderTypes,
  ProviderTypesWithAll,
  RoleType,
  RoleTypes,
  USER_ORDER_TYPE,
} from '@user/domain/entities/User.entity';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ReqAdminGetUserListQueryDto {
  @ApiProperty({ description: UserConstant.USER_LIST_PAGE })
  @Type(() => Number)
  @IsInt()
  readonly offset: number;

  @ApiProperty({ description: UserConstant.USER_LIST_LIMIT })
  @Type(() => Number)
  @IsInt()
  readonly limit: number;

  @ApiProperty({ description: GlobalConstant.ORDER_BY })
  @IsString()
  readonly order: USER_ORDER_TYPE;

  @ApiProperty({ description: UserConstant.USER_PROVIDER })
  @IsEnum(ProviderTypesWithAll)
  @Transform(({ value }) => value.toUpperCase())
  readonly provider: ProviderType | 'ALL';
}

export class ResAdminGetUserListDto {
  @ApiProperty({ description: UserConstant.USER_ID })
  @IsUUID()
  readonly id: UUID;

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
  @IsString()
  readonly selectedBadgeId: number;

  @IsDate()
  @ApiProperty({ description: UserConstant.USER_REGISTER_DATE })
  readonly createdAt: Date;
}
