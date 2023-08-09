import { ApiProperty } from '@nestjs/swagger';
import { BADGE_TYPE_ID } from '@shared/constants/badge.constant';
import { DELETE_BADGE_TYPE_SUCCESS_MESSAGE } from '@shared/messages/admin/badge.admin.messages';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class ReqDeleteBadgeTypeParamDto {
  @ApiProperty({ description: BADGE_TYPE_ID })
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}

export class ResDeleteBadgeTypeDto {
  @ApiProperty({
    example: DELETE_BADGE_TYPE_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
