import { ConfigService } from '@nestjs/config';

export const redisConfig = (configService: ConfigService) => {
  return {
    redisHost: configService.get('REDIS_HOST'),
    redisPort: configService.get('REDIS_PORT'),
    redisPassword: configService.get('REDIS_PASSWORD'),
  };
};
