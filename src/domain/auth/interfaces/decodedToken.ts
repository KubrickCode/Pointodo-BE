interface DecodedToken {
  id: string;
  email: string;
  provider: string;
  role: string;
  defaultBadgeId: number;
  createdAt: string;
  iat?: number;
  exp?: number;
}

export { DecodedToken };
