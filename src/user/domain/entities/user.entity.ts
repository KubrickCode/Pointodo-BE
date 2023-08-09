import { User, Provider, Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: string;
  email: string;

  @Exclude()
  password: string | null;

  provider: Provider;
  role: Role;
  selectedBadge: number;
  createdAt: Date;
}
