import { ConfigService } from '@nestjs/config';

export const cacheConfig = (configService: ConfigService) => {
  return {
    cacheHost: configService.get('REDIS_HOST'),
    cachePort: configService.get('REDIS_PORT'),
    cachePassword: configService.get('REDIS_PASSWORD'),
    cacheTTL: 600,
  };
};
