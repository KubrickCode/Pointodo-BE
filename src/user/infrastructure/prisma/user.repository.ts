import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/prisma.service';
import { Provider, User } from '@prisma/client';
import { IUserRepository } from '@user/domain/interfaces/user.repository.interface';
import { UserEntity } from '@user/domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const query = `
    SELECT u.*, b."iconLink"
    FROM "User" u
    LEFT JOIN "Badge" b ON u."selectedBadge" = b.id
    WHERE u.id = $1::uuid;
    `;
    const result = await this.prisma.$queryRawUnsafe<User>(query, id);
    return result[0] ? plainToClass(UserEntity, result[0]) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const query = `
    SELECT * FROM "User" WHERE email = $1
    `;
    const result = await this.prisma.$queryRawUnsafe<User>(query, email);
    return result[0] ? plainToClass(UserEntity, result[0]) : null;
  }

  async findPasswordById(id: string): Promise<string> {
    const query = `
    SELECT password FROM "User" WHERE id = $1::uuid
    `;
    const result = await this.prisma.$queryRawUnsafe<[{ password: string }]>(
      query,
      id,
    );
    return result[0].password;
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
    return plainToClass(UserEntity, newUser[0]);
  }

  async changePassword(id: string, newPassword: string): Promise<void> {
    const query = `
    UPDATE "User" SET password = $1 WHERE id = $2::uuid
    `;
    const values = [newPassword, id];
    await this.prisma.$queryRawUnsafe<User>(query, ...values);
  }

  async deleteUser(id: string): Promise<UserEntity> {
    const query = `
    DELETE FROM "User" WHERE id = $1::uuid
    RETURNING *
    `;
    const values = [id];
    const user = await this.prisma.$queryRawUnsafe<User>(query, ...values);
    return plainToClass(UserEntity, user[0]);
  }

  async changeSelectedBadge(
    userId: string,
    badgeId: number,
  ): Promise<UserEntity> {
    const query = `
    UPDATE "User" SET "selectedBadge" = $1
    WHERE id = $2::uuid
    RETURNING *
    `;
    const values = [badgeId, userId];
    console.log(values);
    const user = await this.prisma.$queryRawUnsafe<User>(query, ...values);
    return plainToClass(UserEntity, user[0]);
  }

}
