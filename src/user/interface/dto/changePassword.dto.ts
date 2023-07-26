import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { VALIDATE_PASSWORD } from '@shared/messages/auth.messages';

class ReqChangePasswordDto {
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

class ResChangePasswordDto {
  @ApiProperty({ example: '비밀번호 변경 성공', description: '성공 메시지' })
  @IsString()
  readonly message: string;
}

class ResChangePasswordDtoError {
  @ApiProperty({ example: 400, description: '에러 상태 코드' })
  @IsString()
  readonly statusCode: string;

  @ApiProperty({ example: '에러 메시지', description: '에러 메시지' })
  @IsString()
  readonly message: string[];

  @ApiProperty({ example: 'Bad Request', description: '에러 종류' })
  @IsString()
  readonly error: string;
}

export {
  ReqChangePasswordDto,
  ResChangePasswordDto,
  ResChangePasswordDtoError,
};
