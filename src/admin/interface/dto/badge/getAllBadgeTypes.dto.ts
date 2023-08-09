import { ApiProperty } from '@nestjs/swagger';
import {
  BADGE_ICON_LINK,
  BADGE_TYPE_DESC,
  BADGE_TYPE_ID,
  BADGE_TYPE_NAME,
} from '@shared/constants/badge.constant';
import { IsInt, IsString } from 'class-validator';

export class ResGetAllBadgeTypesDto {
  @ApiProperty({ description: BADGE_TYPE_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: BADGE_TYPE_NAME })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: BADGE_TYPE_DESC })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: BADGE_ICON_LINK })
  @IsString()
  readonly iconLink: string;
}
