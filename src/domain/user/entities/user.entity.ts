import { User, Provider, Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string | null;

  @ApiProperty()
  provider: Provider;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  defaultBadgeId: number;

  @ApiProperty()
  createdAt: Date;
}
