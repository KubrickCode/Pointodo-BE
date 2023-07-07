import { User, Provider, Role } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty()
  @Transform((value) => value.toString())
  id: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  provider: Provider;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  defaultBadgeId: number;

  @ApiProperty()
  createdAt: Date;
}
