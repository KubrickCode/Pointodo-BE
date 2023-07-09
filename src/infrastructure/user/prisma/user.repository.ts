import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/services/prisma.service';
import { Provider, Role, User } from '@prisma/client';
import { IUserRepository } from '@domain/user/interfaces/iuser.repository';
import { UserEntity } from '@domain/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const query = `
    SELECT * FROM "User" WHERE email = $1
    `;
    const result = await this.prisma.$queryRawUnsafe<User>(query, email);
    return result ? result[0] : null;
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
    return await this.prisma.$queryRawUnsafe<User>(query, ...values);
  }
}
