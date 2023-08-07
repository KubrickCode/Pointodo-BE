import { ApiProperty } from '@nestjs/swagger';
import { USER_ID } from '@shared/constants/user.constant';
import { DELETE_USER_SUCCESS_MESSAGE } from '@shared/messages/user/user.messages';
import { IsString } from 'class-validator';

export class ReqDeleteUserAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly id: string;
}

export class ResDeleteUserAppDto {
  @ApiProperty({
    example: DELETE_USER_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
