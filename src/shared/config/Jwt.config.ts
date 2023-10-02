import { ConfigService } from '@nestjs/config';

export const jwtConfig = (configService: ConfigService) => {
  return {
    accessTokenSecret: configService.get('ACCESS_TOKEN_SECRET'),
    accessTokenExpiration: '1h',
    refreshTokenSecret: configService.get('REFRESH_TOKEN_SECRET'),
    refreshTokenExpiration: '7d',
  };
};

export const jwtExpiration = {
  accessTokenExpirationHours: 1,
  refreshTokenExpirationDays: 7,
  refreshTokenExpirationSeconds: 60 * 60 * 24 * 7,
};
