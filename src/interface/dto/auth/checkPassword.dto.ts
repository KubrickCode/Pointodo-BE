import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

class ReqCheckPasswordDto {
  @ApiProperty({
    example: 'test1234!@',
    description: '비밀번호(6~20자 영문, 숫자, 특수문자 혼합)',
  })
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/)
  readonly password: string;
}

class ResCheckPasswordDto {
  @ApiProperty({ example: '비밀번호 검증 성공', description: '성공 메시지' })
  @IsString()
  readonly message: string;
}

export { ReqCheckPasswordDto, ResCheckPasswordDto };