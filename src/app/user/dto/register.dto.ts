import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

class ReqRegisterDto {
  @ApiProperty({ description: '이메일' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: '비밀번호(6~20자 영문, 숫자, 특수문자 혼합)' })
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/)
  readonly password: string;
}

class ResRegisterDto {
  @ApiProperty({ description: '성공 메시지' })
  @IsString()
  readonly message: string;
}

export { ReqRegisterDto, ResRegisterDto };
