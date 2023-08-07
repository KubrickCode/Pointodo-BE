import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { VALIDATE_PASSWORD } from '@shared/messages/auth/auth.messages';
import {
  USER_ID,
  USER_PWD,
  USER_PWD_EXAMPLE,
} from '@shared/constants/user.constant';
import { CHANGE_PASSWORD_SUCCESS_MESSAGE } from '@shared/messages/user/user.messages';

export class ReqChangePasswordAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly id: string;

  @ApiProperty({
    example: USER_PWD_EXAMPLE,
    description: USER_PWD,
  })
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/, {
    message: VALIDATE_PASSWORD,
  })
  readonly password: string;
}

export class ResChangePasswordAppDto {
  @ApiProperty({
    example: CHANGE_PASSWORD_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
