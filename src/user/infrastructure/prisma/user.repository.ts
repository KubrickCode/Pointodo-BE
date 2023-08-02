import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/prisma.service';
import { Provider, Role, User } from '@prisma/client';
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

  async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
    user.provider = Provider[user.provider] || Provider['LOCAL'];
    user.role = Role[user.role] || Role['USER'];
    const uuid = uuidv4();

    console.log(uuid);

    const query = `
      INSERT INTO "User" (id, email, password, provider, role)
      VALUES ($1::uuid, $2, $3, $4::"Provider", $5::"Role")
      RETURNING *
    `;
    const values = [uuid, user.email, user.password, user.provider, user.role];
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

  changeSelectedBadge;
}
