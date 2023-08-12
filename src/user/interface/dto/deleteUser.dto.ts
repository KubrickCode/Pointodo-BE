import { ApiProperty } from '@nestjs/swagger';
import { DELETE_USER_SUCCESS_MESSAGE } from '@shared/messages/user/user.messages';
import { IsString } from 'class-validator';

export class ResDeleteUserDto {
  @ApiProperty({
    example: DELETE_USER_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
