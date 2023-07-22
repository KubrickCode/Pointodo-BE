import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';
import {
  VALIDATE_EMAIL,
  VALIDATE_PASSWORD,
} from 'src/shared/messages/auth.messages';
import { Transform } from 'class-transformer';

class ReqRegisterDto {
  @ApiProperty({ example: 'test@gmail.com', description: '이메일' })
  @IsEmail({}, { message: VALIDATE_EMAIL })
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @ApiProperty({
    example: 'test1234!@',
    description: '비밀번호(6~20자 영문, 숫자, 특수문자 혼합)',
  })
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/, {
    message: VALIDATE_PASSWORD,
  })
  readonly password: string;
}

class ResRegisterDto {
  @ApiProperty({ example: '회원가입 성공', description: '성공 메시지' })
  @IsString()
  readonly message: string;
}

class ResRegisterExistUserError {
  @ApiProperty({ example: 409, description: '에러 상태 코드' })
  @IsString()
  readonly statusCode: number;

  @ApiProperty({
    example: '이미 존재하는 계정입니다.',
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string[];

  @ApiProperty({ example: '/api/user/register', description: '요청 경로' })
  @IsString()
  readonly path: string;
}

export { ReqRegisterDto, ResRegisterDto, ResRegisterExistUserError };
