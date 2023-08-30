import { UUID } from 'crypto';

export interface DecodedAccessToken {
  id: UUID;
  iat?: number;
  exp?: number;
}

export interface DecodedRefreshToken {
  id: UUID;
  iat?: number;
  exp?: number;
}
