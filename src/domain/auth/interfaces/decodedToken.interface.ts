import { Provider, Role } from '@prisma/client';

interface DecodedAccessToken {
  id: string;
  email: string;
  provider: Provider;
  role: Role;
  defaultBadgeId: number;
  createdAt: Date;
  iat?: number;
  exp?: number;
}

interface DecodedRefreshToken {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

export { DecodedAccessToken, DecodedRefreshToken };
