import { ApiProperty } from '@nestjs/swagger';
import { BADGE_TYPE_NAME } from '@shared/constants/badge.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { CHANGE_USER_BADGE_MESSAGE } from '@shared/messages/badge/badge.messages';
import { IsString } from 'class-validator';

export class ReqChangeSelectedBadgeAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: BADGE_TYPE_NAME })
  @IsString()
  readonly badgeType: string;
}

export class ResChangeSelectedBadgeAppDto {
  @ApiProperty({
    example: CHANGE_USER_BADGE_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
