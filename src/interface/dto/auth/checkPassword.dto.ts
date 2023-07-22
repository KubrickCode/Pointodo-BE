import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { VALIDATE_PASSWORD } from '@shared/messages/auth.messages';

class ReqCheckPasswordDto {
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

class ResCheckPasswordDto {
  @ApiProperty({ example: '비밀번호 검증 성공', description: '성공 메시지' })
  @IsString()
  readonly message: string;
}

class ResInvalidCheckPassword {
  @ApiProperty({ example: 401, description: '에러 상태 코드' })
  @IsString()
  readonly statusCode: number;

  @ApiProperty({
    example: '비밀번호가 일치하지 않습니다',
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

export { ReqCheckPasswordDto, ResCheckPasswordDto, ResInvalidCheckPassword };
