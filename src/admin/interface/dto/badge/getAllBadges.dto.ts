import { ApiProperty } from '@nestjs/swagger';
import {
  BADGE_ICON_LINK,
  BADGE_DESC,
  BADGE_ID,
  BADGE_NAME,
} from '@shared/constants/badge.constant';
import { IsInt, IsString } from 'class-validator';

export class ResGetAllBadgesDto {
  @ApiProperty({ description: BADGE_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: BADGE_NAME })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: BADGE_DESC })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: BADGE_ICON_LINK })
  @IsString()
  readonly iconLink: string;
}
