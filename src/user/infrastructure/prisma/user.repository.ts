import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/prisma.service';
import { Provider, User } from '@prisma/client';
import { IUserRepository } from '@user/domain/interfaces/user.repository.interface';
import { UserEntity } from '@user/domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const query = `
    SELECT * FROM "User" WHERE id = $1::uuid
    `;
    const result = await this.prisma.$queryRawUnsafe<User>(query, id);
    return result ? result[0] : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const query = `
    SELECT * FROM "User" WHERE email = $1
    `;
    const result = await this.prisma.$queryRawUnsafe<User>(query, email);
    return result ? result[0] : null;
  }

  async createUser(
    email: string,
    password?: string,
    provider?: string,
  ): Promise<UserEntity> {
    provider = Provider[provider] || Provider['LOCAL'];
    const uuid = uuidv4();

    const query = `
      INSERT INTO "User" (id, email, password, provider)
      VALUES ($1::uuid, $2, $3, $4::"Provider")
      RETURNING *
    `;
    const values = [uuid, email, password, provider];
    const newUser = await this.prisma.$queryRawUnsafe<User>(query, ...values);
    return newUser[0];
  }

  async changePassword(id: string, newPassword: string): Promise<UserEntity> {
    const query = `
    UPDATE "User" SET password = $1 WHERE id = $2::uuid
    RETURNING *
    `;
    const values = [newPassword, id];
    const user = await this.prisma.$queryRawUnsafe<User>(query, ...values);
    return user[0];
  }

  async deleteUser(id: string): Promise<UserEntity> {
    const query = `
    DELETE FROM "User" WHERE id = $1::uuid
    RETURNING *
    `;
    const values = [id];
    const user = await this.prisma.$queryRawUnsafe<User>(query, ...values);
    return user[0];
  }

  async changeSelectedBadge(
    userId: string,
    badgeType: string,
  ): Promise<UserEntity> {
    const query = `
    UPDATE "User" SET "selectedBadge" = $1 WHERE id = $2::uuid
    RETURNING *
    `;
    const values = [badgeType, userId];
    const user = await this.prisma.$queryRawUnsafe<User>(query, ...values);
    return user[0];
  }
}
