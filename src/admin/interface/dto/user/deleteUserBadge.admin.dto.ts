import { ApiProperty } from '@nestjs/swagger';
import { BADGE_ID } from '@shared/constants/badge.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { DELETE_USER_BADGE_SUCCESS_MESSAGE } from '@shared/messages/badge/badge.messages';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class ReqAdminDeleteUserBadgeQueryDto {
  @ApiProperty({ description: BADGE_ID })
  @Type(() => Number)
  @IsInt()
  readonly badgeId: number;

  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly userId: string;
}

export class ResAdminDeleteUserBadgeDto {
  @ApiProperty({
    example: DELETE_USER_BADGE_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
