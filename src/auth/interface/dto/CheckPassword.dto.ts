import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Matches } from 'class-validator';
import { AuthMessage } from '@shared/messages/auth/Auth.messages';
import { UserConstant } from '@shared/constants/User.constant';
import { AuthErrorMessage } from '@shared/messages/auth/Auth.errors';

export class ReqCheckPasswordDto {
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

export class ResInvalidCheckPassword {
  @ApiProperty({ example: 401, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number;

  @ApiProperty({
    example: AuthErrorMessage.AUTH_INVALID_PASSWORD,
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string;

  @ApiProperty({
    example: '/api/auth/check-password',
    description: '요청 경로',
  })
  @IsString()
  readonly path: string;
}
