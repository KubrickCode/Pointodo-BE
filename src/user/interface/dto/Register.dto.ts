import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Matches } from 'class-validator';
import { AuthMessage } from '@shared/messages/auth/Auth.messages';
import { Transform } from 'class-transformer';
import { UserConstant } from '@shared/constants/User.constant';
import { UserErrorMessage } from '@shared/messages/user/User.errors';

export class ReqRegisterDto {
  @ApiProperty({
    example: UserConstant.USER_EMAIL_EXAMPLE,
    description: UserConstant.USER_EMAIL,
  })
  @IsEmail({}, { message: AuthMessage.VALIDATE_EMAIL })
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @ApiProperty({
    example: UserConstant.USER_PWD_EXAMPLE,
    description: UserConstant.USER_PWD,
  })
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/, {
    message: AuthMessage.VALIDATE_PASSWORD,
  })
  readonly password: string;
}

export class ResRegisterExistUserError {
  @ApiProperty({ example: 409, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number;

  @ApiProperty({
    example: UserErrorMessage.USER_ALREADY_EXIST,
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string;

  @ApiProperty({ example: '/api/user/register', description: '요청 경로' })
  @IsString()
  readonly path: string;
}
