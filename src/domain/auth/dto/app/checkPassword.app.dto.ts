import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { VALIDATE_PASSWORD } from 'src/shared/messages/auth.messages';

class ReqCheckPasswordAppDto {
  @ApiProperty({ description: '유저 고유 ID(UUID)' })
  @IsString()
  readonly id: string;

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

class ResCheckPasswordAppDto {
  @ApiProperty({ example: '비밀번호 검증 성공', description: '성공 메시지' })
  @IsString()
  readonly message: string;
}

export { ReqCheckPasswordAppDto, ResCheckPasswordAppDto };
