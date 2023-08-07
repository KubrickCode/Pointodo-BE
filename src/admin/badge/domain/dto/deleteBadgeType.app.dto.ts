import { ApiProperty } from '@nestjs/swagger';
import { DELETE_BADGE_TYPE_SUCCESS_MESSAGE } from '@shared/messages/admin/badge.admin.messages';
import { IsString } from 'class-validator';

export class ResDeleteBadgeTypeAppDto {
  @ApiProperty({
    example: DELETE_BADGE_TYPE_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
