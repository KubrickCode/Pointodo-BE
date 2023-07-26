export interface DecodedAccessToken {
  id: string;
  iat?: number;
  exp?: number;
}

export interface DecodedRefreshToken {
  id: string;
  iat?: number;
  exp?: number;
}
