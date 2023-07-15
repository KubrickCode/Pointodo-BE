import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Provider, Role, User } from '@prisma/client';
import { IUserRepository } from '@domain/user/interfaces/user.repository.interface';
import { UserEntity } from '@domain/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { ICacheService } from '@domain/cache/interfaces/cache.service.interface';
import { ConfigService } from '@nestjs/config';
import { cacheConfig } from 'src/shared/config/cache.config';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('ICacheService')
    private readonly cacheRepository: ICacheService,
    private readonly configService: ConfigService,
  ) {}

  async findById(id: string): Promise<User | null> {
    const cacheKey = `getUserById:${id}`;
    const cachedUser = await this.cacheRepository.getFromCache<User>(cacheKey);
    if (cachedUser) {
      return cachedUser;
    } else {
      const query = `
    SELECT * FROM "User" WHERE id = $1::uuid
    `;
      const result = await this.prisma.$queryRawUnsafe<User>(query, id);
      if (result) {
        await this.cacheRepository.setCache(
          cacheKey,
          result[0],
          cacheConfig(this.configService).cacheTTL,
        );
      }
      return result ? result[0] : null;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const cacheKey = `getUserByEmail:${email}`;
    const cachedUser = await this.cacheRepository.getFromCache<User>(cacheKey);
    if (cachedUser) {
      return cachedUser;
    } else {
      const query = `
    SELECT * FROM "User" WHERE email = $1
    `;
      const result = await this.prisma.$queryRawUnsafe<User>(query, email);
      if (result) {
        await this.cacheRepository.setCache(
          cacheKey,
          result[0],
          cacheConfig(this.configService).cacheTTL,
        );
      }
      return result ? result[0] : null;
    }
  }

  async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
    user.provider = Provider[user.provider] || Provider['Local'];
    user.role = Role[user.role] || Role['User'];
    const uuid = uuidv4();

    const query = `
      INSERT INTO "User" (id, email, password, provider, role)
      VALUES ($1::uuid, $2, $3, $4::"Provider", $5::"Role")
      RETURNING *
    `;
    const values = [uuid, user.email, user.password, user.provider, user.role];
    const newUser = await this.prisma.$queryRawUnsafe<User>(query, ...values);
    return newUser[0];
  }
}
