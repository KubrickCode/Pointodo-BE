import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Provider, Role, User } from '@prisma/client';
import { IUserRepository } from '@domain/user/interfaces/user.repository.interface';
import { UserEntity } from '@domain/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const query = `
    SELECT * FROM "User" WHERE id = $1::uuid
    `;
    const result = await this.prisma.$queryRawUnsafe<User>(query, id);
    return result ? result[0] : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = `
    SELECT * FROM "User" WHERE email = $1
    `;
    const result = await this.prisma.$queryRawUnsafe<User>(query, email);
    return result ? result[0] : null;
  }

  async createUser(user: Partial<UserEntity>): Promise<User> {
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

  async changePassword(id: string, newPassword: string) {
    const query = `
    UPDATE "User" SET password = $1 WHERE id = $2::uuid
    RETURNING *
    `;
    const values = [newPassword, id];
    const user = await this.prisma.$queryRawUnsafe<User>(query, ...values);
    return user[0];
  }
}
