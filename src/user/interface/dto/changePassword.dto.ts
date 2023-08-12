import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsString, Matches } from 'class-validator';
import { VALIDATE_PASSWORD } from '@shared/messages/auth/auth.messages';
import { USER_PWD, USER_PWD_EXAMPLE } from '@shared/constants/user.constant';
import { CHANGE_PASSWORD_SUCCESS_MESSAGE } from '@shared/messages/user/user.messages';

export class ReqChangePasswordDto {
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

export class ResChangePasswordDto {
  @ApiProperty({
    example: CHANGE_PASSWORD_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}

export class ResChangePasswordDtoError {
  @ApiProperty({ example: 400, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number;

  @ApiProperty({ example: '에러 메시지', description: '에러 메시지' })
  @IsArray()
  readonly message: string[];

  @ApiProperty({ example: 'Bad Request', description: '에러 종류' })
  @IsString()
  readonly error: string;
}
