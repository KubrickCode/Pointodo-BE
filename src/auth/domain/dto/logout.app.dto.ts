import { ApiProperty } from '@nestjs/swagger';
import { USER_ID } from '@shared/constants/user.constant';
import { LOGOUT_SUCCESS_MESSAGE } from '@shared/messages/auth/auth.messages';
import { IsString } from 'class-validator';

export class ReqLogoutAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly id: string;
}

export class ResLogoutAppDto {
  @ApiProperty({ example: LOGOUT_SUCCESS_MESSAGE, description: '성공 메시지' })
  @IsString()
  readonly message: string;
}
