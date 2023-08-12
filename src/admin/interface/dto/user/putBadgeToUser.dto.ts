import { ApiProperty } from '@nestjs/swagger';
import { BADGE_ID } from '@shared/constants/badge.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { PUT_BADGE_SUCCESS_MESSAGE } from '@shared/messages/badge/badge.messages';
import { IsInt, IsString } from 'class-validator';

export class ReqPutBadgeToUserDto {
  @ApiProperty({ description: BADGE_ID })
  @IsInt()
  readonly badgeId: number;

  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly userId: string;
}

export class ResPutBadgeToUserDto {
  @ApiProperty({
    example: PUT_BADGE_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
