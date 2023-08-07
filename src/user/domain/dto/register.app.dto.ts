import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';
import {
  VALIDATE_EMAIL,
  VALIDATE_PASSWORD,
} from '@shared/messages/auth/auth.messages';
import {
  USER_EMAIL,
  USER_EMAIL_EXAMPLE,
  USER_PWD,
  USER_PWD_EXAMPLE,
} from '@shared/constants/user.constant';
import { REGISTER_SUCCESS_MESSAGE } from '@shared/messages/user/user.messages';

export class ReqRegisterAppDto {
  @ApiProperty({ example: USER_EMAIL_EXAMPLE, description: USER_EMAIL })
  @IsEmail({}, { message: VALIDATE_EMAIL })
  readonly email: string;

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

export class ResRegisterAppDto {
  @ApiProperty({
    example: REGISTER_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
