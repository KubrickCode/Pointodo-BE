import { ConfigService } from '@nestjs/config';

export const jwtConfig = (configService: ConfigService) => {
  return {
    accessTokenSecret: configService.get('ACCESS_TOKEN_SECRET'),
    accessTokenExpiration: '10s',
    refreshTokenSecret: configService.get('REFRESH_TOKEN_SECRET'),
    refreshTokenExpiration: '1m',
  };
};

export const jwtExpiration = {
  refreshTokenExpirationSeconds: 60,
};
