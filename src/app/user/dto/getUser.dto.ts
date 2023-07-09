import { ApiProperty } from '@nestjs/swagger';
import { Provider, Role } from '@prisma/client';
import { IsDate, IsEnum, IsInt, IsString } from 'class-validator';

class ResGetUserDto {
  @ApiProperty({ description: '유저 고유 ID(UUID)' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'test@gmail.com', description: '이메일' })
  @IsString()
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

export { ResGetUserDto };
