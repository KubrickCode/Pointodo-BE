import { ApiProperty } from '@nestjs/swagger';
import { LOGOUT_SUCCESS_MESSAGE } from '@shared/messages/auth/auth.messages';
import { IsString } from 'class-validator';

export class ResLogoutDto {
  @ApiProperty({ example: LOGOUT_SUCCESS_MESSAGE, description: '성공 메시지' })
  @IsString()
  readonly message: string;
}
