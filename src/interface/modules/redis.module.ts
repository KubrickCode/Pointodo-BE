import { Module, Global } from '@nestjs/common';
import { RedisService } from '@infrastructure/redis/redis.service';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
