import { ApiProperty } from '@nestjs/swagger';
import {
  BADGE_ICON_LINK,
  BADGE_TYPE_DESC,
  BADGE_TYPE_NAME,
} from '@shared/constants/badge.constant';
import { CREATE_BADGE_TYPE_SUCCESS_MESSAGE } from '@shared/messages/admin/badge.admin.messages';
import { IsString } from 'class-validator';

export class ReqCreateBadgeTypeAppDto {
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

export class ResCreateBadgeTypeAppDto {
  @ApiProperty({
    example: CREATE_BADGE_TYPE_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
