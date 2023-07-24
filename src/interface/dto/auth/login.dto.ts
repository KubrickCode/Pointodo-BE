import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';
import {
  VALIDATE_EMAIL,
  VALIDATE_PASSWORD,
} from '@shared/messages/auth.messages';

class ReqLoginDto {
  @ApiProperty({ example: 'test@gmail.com', description: '이메일' })
  @IsEmail({}, { message: VALIDATE_EMAIL })
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

class ResLoginDto {
  @ApiProperty({ description: 'JWT 액세스 토큰' })
  @IsString()
  readonly accessToken: string;

  @ApiProperty({ description: 'JWT 리프레시 토큰 - 쿠키 설정' })
  @IsString()
  readonly refreshToken?: string;
}

class ResNotFoundUser {
  @ApiProperty({ example: 404, description: '에러 상태 코드' })
  @IsString()
  readonly statusCode: number;

  @ApiProperty({
    example: '존재하지 않는 계정입니다',
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string;

  @ApiProperty({ example: '/api/auth/login', description: '요청 경로' })
  @IsString()
  readonly path: string;
}

class ResInvalidPassword {
  @ApiProperty({ example: 401, description: '에러 상태 코드' })
  @IsString()
  readonly statusCode: number;

  @ApiProperty({
    example: '비밀번호가 일치하지 않습니다',
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string;

  @ApiProperty({ example: '/api/auth/login', description: '요청 경로' })
  @IsString()
  readonly path: string;
}

export { ReqLoginDto, ResLoginDto, ResNotFoundUser, ResInvalidPassword };
