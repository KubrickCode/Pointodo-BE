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
} from '@shared/messages/auth/auth.messages';

export class ReqValidateUserAppDto {
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

export class ResValidateUserAppDto {
  @ApiProperty({ description: '유저 고유 ID(UUID)' })
  @IsString()
  readonly id: string;

  @ApiProperty({ example: 'test@gmail.com', description: '이메일' })
  @IsEmail({}, { message: VALIDATE_EMAIL })
  readonly email: string;

  @ApiProperty({ example: 'LOCAL | GOOGLE | KAKAO', description: '공급 업체' })
  @IsEnum(Provider)
  readonly provider: Provider;

  @ApiProperty({ example: 'USER | ADMIN', description: '권한' })
  @IsEnum(Role)
  readonly role: Role;

  @ApiProperty({ description: '뱃지ID' })
  @IsInt()
  readonly defaultBadgeId: number;

  @IsDate()
  @ApiProperty({ description: '가입 날짜' })
  readonly createdAt: Date;
}
