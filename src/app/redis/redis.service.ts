import { Inject, Injectable } from '@nestjs/common';
import { IRedisService } from '@domain/redis/interfaces/redis.service.interface';

@Injectable()
export class RedisService implements IRedisService {
  constructor(
    @Inject('IRedisService')
    private readonly redisService: IRedisService,
  ) {}

  async set(key: string, value: any, ttl: number): Promise<void> {
    await this.redisService.set(key, value, ttl);
  }
  async get(key: string): Promise<any | null> {
    return this.redisService.get(key);
  }
  async delete(key: string): Promise<void> {
    await this.redisService.delete(key);
  }
}
