import { ConfigService } from '@nestjs/config';

export const jwtConfig = (configService: ConfigService) => {
  const jwtSecret = configService.get('JWT_SECRET');
  const jwtRefreshSecret = configService.get('JWT_REFRESH_SECRET');
  const accessTokenExpiration = '1h';

  return {
    jwtSecret,
    jwtRefreshSecret,
    accessTokenExpiration,
  };
};
