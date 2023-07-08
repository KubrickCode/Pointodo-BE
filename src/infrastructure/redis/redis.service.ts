import { IRedisService } from '@domain/redis/interfaces/iredis.service';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisConfig } from 'config/redis.config';
import Redis from 'ioredis';

@Injectable()
export class RedisService
  implements IRedisService, OnModuleInit, OnModuleDestroy
{
  private client: Redis;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.client = new Redis({
      host: redisConfig(this.configService).redisHost,
      port: redisConfig(this.configService).redisPort,
      password: redisConfig(this.configService).redisPassword,
    });
  }

  onModuleDestroy() {
    this.client.disconnect();
  }

  async set(key: string, value: any, ttl: number) {
    await this.client.set(key, JSON.stringify(value), 'EX', ttl);
  }

  async get(key: string) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async delete(key: string) {
    await this.client.del(key);
  }
}
