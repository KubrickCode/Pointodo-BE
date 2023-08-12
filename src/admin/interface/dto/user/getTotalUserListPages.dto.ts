import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import { TOTAL_PAGE } from '@shared/constants/global.constant';
import { USER_PROVIDER } from '@shared/constants/user.constant';
import {
  ProviderType,
  ProviderTypesWithAll,
} from '@user/domain/entities/user.entity';
import { Transform } from 'class-transformer';

export class ReqGetTotalUserListPagesParamDto {
  @ApiProperty({ description: USER_PROVIDER })
  @IsEnum(ProviderTypesWithAll)
  @Transform(({ value }) => value.toUpperCase())
  readonly provider: ProviderType | 'ALL';
}

export class ResGetTotalUserListPagesDto {
  @ApiProperty({ description: TOTAL_PAGE })
  @IsInt()
  readonly totalPages: number;
}
