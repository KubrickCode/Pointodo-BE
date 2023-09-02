import { ApiProperty } from '@nestjs/swagger';
import { BADGE_ID } from '@shared/constants/badge.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { PUT_BADGE_SUCCESS_MESSAGE } from '@shared/messages/badge/badge.messages';
import { Type } from 'class-transformer';
import { IsInt, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ReqAdminPutBadgeToUserQueryDto {
  @ApiProperty({ description: USER_ID })
  @IsUUID()
  readonly userId: UUID;

  @ApiProperty({ description: BADGE_ID })
  @Type(() => Number)
  @IsInt()
  readonly badgeId: number;
}

export class ResAdminPutBadgeToUserDto {
  @ApiProperty({
    example: PUT_BADGE_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
