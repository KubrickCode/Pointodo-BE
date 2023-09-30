import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import { GlobalConstant } from '@shared/constants/global.constant';
import { UserConstant } from '@shared/constants/user.constant';
import {
  ProviderType,
  ProviderTypesWithAll,
} from '@user/domain/entities/user.entity';
import { Transform, Type } from 'class-transformer';

export class ReqAdminGetTotalUserListPagesQueryDto {
  @ApiProperty({ description: UserConstant.USER_PROVIDER })
  @IsEnum(ProviderTypesWithAll)
  @Transform(({ value }) => value.toUpperCase())
  readonly provider: ProviderType | 'ALL';

  @ApiProperty({ description: UserConstant.USER_LIST_LIMIT })
  @Type(() => Number)
  @IsInt()
  readonly limit: number;
}

export class ResAdminGetTotalUserListPagesDto {
  @ApiProperty({ description: GlobalConstant.TOTAL_PAGE })
  @IsInt()
  readonly totalPages: number;
}
