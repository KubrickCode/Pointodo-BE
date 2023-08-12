import { ApiProperty } from '@nestjs/swagger';
import {
  USER_EMAIL,
  USER_EMAIL_EXAMPLE,
  USER_ID,
  USER_PROVIDER,
  USER_PROVIDER_EXAMPLE,
  USER_REGISTER_DATE,
  USER_ROLE,
  USER_ROLE_EXAMPLE,
  USER_SELECTED_BADGE,
} from '@shared/constants/user.constant';
import {
  ProviderType,
  ProviderTypes,
  RoleType,
  RoleTypes,
} from '@user/domain/entities/user.entity';
import { IsDate, IsEnum, IsString } from 'class-validator';

export class ResGetUserDto {
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

  @ApiProperty({ description: USER_SELECTED_BADGE })
  @IsString()
  readonly selectedBadge: number;

  @IsDate()
  @ApiProperty({ description: USER_REGISTER_DATE })
  readonly createdAt: Date;
}
