import { ApiProperty } from '@nestjs/swagger';
import { Provider, Role } from '@prisma/client';
import { IsDate, IsEnum, IsInt, IsString } from 'class-validator';

class ResGetUserDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsEnum(Provider)
  provider: Provider;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsInt()
  defaultBadgeId: number;

  @IsDate()
  @ApiProperty()
  createdAt: Date;
}

export { ResGetUserDto };
