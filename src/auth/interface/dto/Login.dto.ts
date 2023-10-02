import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Matches } from 'class-validator';
import { AuthMessage } from '@shared/messages/auth/Auth.messages';
import { UserConstant } from '@shared/constants/User.constant';
import { UserErrorMessage } from '@shared/messages/user/User.errors';
import { AuthErrorMessage } from '@shared/messages/auth/Auth.errors';

export class ReqLoginDto {
  @ApiProperty({
    example: UserConstant.USER_EMAIL_EXAMPLE,
    description: UserConstant.USER_EMAIL,
  })
  @IsEmail({}, { message: AuthMessage.VALIDATE_EMAIL })
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

export class ResNotFoundUser {
  @ApiProperty({ example: 404, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number;

  @ApiProperty({
    example: UserErrorMessage.USER_NOT_FOUND,
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string;

  @ApiProperty({ example: '/api/auth/login', description: '요청 경로' })
  @IsString()
  readonly path: string;
}

export class ResInvalidPassword {
  @ApiProperty({ example: 401, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number;

  @ApiProperty({
    example: AuthErrorMessage.AUTH_INVALID_PASSWORD,
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string;

  @ApiProperty({ example: '/api/auth/login', description: '요청 경로' })
  @IsString()
  readonly path: string;
}

export class ResNotLocalUserLogin {
  @ApiProperty({ example: 409, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number;

  @ApiProperty({
    example: UserErrorMessage.USER_EXIST_WITH_SOCIAL,
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string;

  @ApiProperty({ example: '/api/auth/login', description: '요청 경로' })
  @IsString()
  readonly path: string;
}
