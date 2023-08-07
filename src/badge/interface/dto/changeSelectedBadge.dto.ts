import { ApiProperty } from '@nestjs/swagger';
import { BADGE_TYPE_NAME } from '@shared/constants/badge.constant';
import { CHANGE_USER_BADGE_MESSAGE } from '@shared/messages/badge/badge.messages';
import { IsString } from 'class-validator';

export class ReqChangeSelectedBadgeDto {
  @ApiProperty({ description: BADGE_TYPE_NAME })
  @IsString()
  readonly badgeType: string;
}

export class ResChangeSelectedBadgeDto {
  @ApiProperty({
    example: CHANGE_USER_BADGE_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
