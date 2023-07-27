interface DecodedAccessToken {
  id: string;
  iat?: number;
  exp?: number;
}

interface DecodedRefreshToken {
  id: string;
  iat?: number;
  exp?: number;
}

export { DecodedAccessToken, DecodedRefreshToken };
