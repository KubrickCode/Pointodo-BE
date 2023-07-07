import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/services/prisma.service';
import { User } from '@prisma/client';
import { IUserRepository } from '@domain/user/interfaces/iuser.repository';
import { UserEntity } from '@domain/user/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const query = `
    SELECT * FROM User WHERE email = $1
    `;
    const result = await this.prisma.$queryRawUnsafe<User>(query, email);
    return result ? result[0] : null;
  }

  async createUser(user: UserEntity): Promise<User> {
    const query = `
      INSERT INTO User (id, email, password, provider, role)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [
      user.id,
      user.email,
      user.password,
      user.provider,
      user.role,
    ];
    const result = await this.prisma.$queryRawUnsafe<User>(query, ...values);
    return result[0];
  }
}
