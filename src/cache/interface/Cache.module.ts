import { Module, Global } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { cacheConfig } from '@shared/config/Cache.config';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: cacheConfig(configService).cacheHost,
        port: cacheConfig(configService).cachePort,
        password: cacheConfig(configService).cachePassword,
        ttl: cacheConfig(configService).cacheTTL,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
