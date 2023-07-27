import { User, Provider, Role } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  email: string;
  password: string | null;
  provider: Provider;
  role: Role;
  defaultBadgeId: number;
  createdAt: Date;
}
