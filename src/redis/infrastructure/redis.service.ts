import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisConfig } from '@shared/config/redis.config';
import Redis from 'ioredis';
import { IRedisService } from '../domain/interfaces/redis.service.interface';

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
      lazyConnect: false,
      connectTimeout: 10000,
    });
  }

  onModuleDestroy() {
    this.client.disconnect();
  }

  async set(key: string, value: any, ttl: number) {
    await this.client?.set(key, JSON.stringify(value), 'EX', ttl);
  }

  async get(key: string) {
    const data = await this.client?.get(key);
    return data ? JSON.parse(data) : null;
  }

  async delete(key: string) {
    await this.client?.del(key);
  }

  async deleteKeysByPrefix(prefix: string): Promise<void> {
    const keys = await this.client?.keys(`${prefix}*`);
    if (keys.length > 0) {
      await this.client?.del(...keys);
    }
  }
}
