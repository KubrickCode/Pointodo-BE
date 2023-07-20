import { ConfigService } from '@nestjs/config';

const jwtConfig = (configService: ConfigService) => {
  return {
    accessTokenSecret: configService.get('ACCESS_TOKEN_SECRET'),
    accessTokenExpiration: '1h',
    refreshTokenSecret: configService.get('REFRESH_TOKEN_SECRET'),
    refreshTokenExpiration: '7d',
  };
};

const jwtExpiration = {
  refreshTokenExpirationSeconds: 60 * 60 * 24 * 7,
};

export { jwtConfig, jwtExpiration };
