import { ApiProperty } from '@nestjs/swagger';
import { CHANGE_USER_BADGE_MESSAGE } from '@shared/messages/badge/badge.messages';
import { IsString } from 'class-validator';

export class ReqChangeSelectedBadgeDto {
  @ApiProperty({ description: '뱃지 유형' })
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
