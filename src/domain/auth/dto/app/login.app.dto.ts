import { ApiProperty } from '@nestjs/swagger';
import { Provider, Role } from '@prisma/client';
import { IsDate, IsEmail, IsEnum, IsInt, IsString } from 'class-validator';
import { VALIDATE_EMAIL } from 'src/shared/messages/auth.messages';

class ReqLoginAppDto {
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

class ResLoginAppDto {
  @ApiProperty({ description: 'JWT 액세스 토큰' })
  @IsString()
  readonly accessToken: string;

  @ApiProperty({ description: 'JWT 리프레시 토큰 - 쿠키 설정' })
  @IsString()
  readonly refreshToken?: string;
}

export { ReqLoginAppDto, ResLoginAppDto };
