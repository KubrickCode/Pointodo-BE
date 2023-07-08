import { ConfigService } from '@nestjs/config';

export const redisConfig = (configService: ConfigService) => {
  const redisHost = configService.get('REDIS_HOST');
  const redisPort = configService.get('REDIS_PORT');
  const redisPassword = configService.get('REDIS_PASSWORD');

  return {
    redisHost,
    redisPort,
    redisPassword,
  };
};
