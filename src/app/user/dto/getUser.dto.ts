import { Provider, Role } from '@prisma/client';

class ResGetUserDto {
  id: string;
  email: string;
  provider: Provider;
  role: Role;
  defaultBadgeId: number;
  createdAt: Date;
}

export { ResGetUserDto };
