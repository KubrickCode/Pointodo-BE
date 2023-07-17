import { ApiProperty } from '@nestjs/swagger';
import { Provider, Role } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsString,
  Matches,
} from 'class-validator';
import {
  VALIDATE_EMAIL,
  VALIDATE_PASSWORD,
} from 'src/shared/messages/auth.messages';

class ReqValidateUserAppDto {
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

class ResValidateUserAppDto {
  @ApiProperty({ description: '유저 고유 ID(UUID)' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'test@gmail.com', description: '이메일' })
  @IsEmail({}, { message: VALIDATE_EMAIL })
  email: string;

  @ApiProperty({ example: 'Local | Google | Kakao', description: '공급 업체' })
  @IsEnum(Provider)
  provider: Provider;

  @ApiProperty({ example: 'User | Admin', description: '권한' })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ description: '뱃지ID' })
  @IsInt()
  defaultBadgeId: number;

  @IsDate()
  @ApiProperty({ description: '가입 날짜' })
  createdAt: Date;
}

export { ReqValidateUserAppDto, ResValidateUserAppDto };
