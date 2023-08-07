import { ApiProperty } from '@nestjs/swagger';
import { BADGE_TYPE_NAME } from '@shared/constants/badge.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { BUY_BADGE_SUCCESS_MESSAGE } from '@shared/messages/badge/badge.messages';
import { IsInt, IsString } from 'class-validator';

export class ReqBuyBadgeAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: BADGE_TYPE_NAME })
  @IsInt()
  readonly badgeType: string;
}

export class ResBuyBadgeAppDto {
  @ApiProperty({
    example: BUY_BADGE_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
