import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BADGE_ICON_LINK,
  BADGE_TYPE_DESC,
  BADGE_TYPE_ID,
  BADGE_TYPE_NAME,
} from '@shared/constants/badge.constant';
import { DELETE_BADGE_TYPE_SUCCESS_MESSAGE } from '@shared/messages/admin/badge.admin.messages';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ReqUpdateBadgeTypeAppDto {
  @ApiProperty({ description: BADGE_TYPE_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: BADGE_TYPE_NAME })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: BADGE_TYPE_DESC })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({ description: BADGE_ICON_LINK })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly iconLink: string;
}

export class ResUpdateBadgeTypeAppDto {
  @ApiProperty({
    example: DELETE_BADGE_TYPE_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
