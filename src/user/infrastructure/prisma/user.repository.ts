import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/prisma.service';
import { Provider, User } from '@prisma/client';
import { IUserRepository } from '@user/domain/interfaces/user.repository.interface';
import { ProviderType, UserEntity } from '@user/domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        selectedBadge: {
          select: { iconLink: true },
        },
      },
    });
    return user ? plainToClass(UserEntity, user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? plainToClass(UserEntity, user) : null;
  }

  async findPasswordById(id: string): Promise<string> {
    const result = await this.prisma.user.findUnique({
      where: { id },
      select: { password: true },
    });
    return result.password;
  }

  async createUser(
    email: string,
    password?: string,
    provider?: ProviderType,
  ): Promise<UserEntity> {
    provider = Provider[provider] || Provider['LOCAL'];
    const uuid = uuidv4();

    const newUser = await this.prisma.user.create({
      data: { id: uuid, email, password, provider },
    });
    return plainToClass(UserEntity, newUser);
  }

  async changePassword(id: string, newPassword: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { password: newPassword },
    });
  }

  async deleteUser(id: string): Promise<UserEntity> {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    return plainToClass(UserEntity, deletedUser);
  }

  async changeSelectedBadge(
    userId: string,
    badgeId: number,
  ): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { selectedBadgeId: badgeId },
    });
    return plainToClass(UserEntity, user);
  }

  async changeSelectedBadgeToDefault(badgeId: number): Promise<void> {
    await this.prisma.user.updateMany({
      where: { selectedBadgeId: badgeId },
      data: { selectedBadgeId: 1 },
    });
  }

  async getUserList(
    order: string,
    limit: number,
    offset: number,
    provider: ProviderType | 'ALL',
  ): Promise<UserEntity[]> {
    let result: User[];
    if (provider === 'ALL') {
      result = await this.prisma.user.findMany({
        orderBy: { createdAt: order === 'newest' ? 'desc' : 'asc' },
        take: limit,
        skip: offset,
      });
    } else {
      result = await this.prisma.user.findMany({
        where: { provider },
        orderBy: { createdAt: order === 'newest' ? 'desc' : 'asc' },
        take: limit,
        skip: offset,
      });
    }
    return result.map((user) => plainToClass(UserEntity, user));
  }

  async getTotalUserListPages(provider: ProviderType | 'ALL'): Promise<number> {
    if (provider === 'ALL') {
      return await this.prisma.user.count();
    } else {
      return await this.prisma.user.count({ where: { provider } });
    }
  }
}
