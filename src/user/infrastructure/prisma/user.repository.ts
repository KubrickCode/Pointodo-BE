import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/prisma.service';
import { Provider } from '@prisma/client';
import { IUserRepository } from '@user/domain/interfaces/user.repository.interface';
import { ProviderType, UserEntity } from '@user/domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

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
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async findPasswordById(id: string): Promise<string> {
    const result = await this.prisma.userPassword.findUnique({
      where: { userId: id },
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

    return await this.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: { id: uuid, email, provider },
      });

      if (password)
        await tx.userPassword.create({
          data: { userId: newUser.id, password: password },
        });

      return newUser;
    });
  }

  async changePassword(id: string, newPassword: string): Promise<void> {
    await this.prisma.userPassword.update({
      where: { userId: id },
      data: { password: newPassword },
    });
  }

  async deleteUser(id: string): Promise<UserEntity> {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    return deletedUser;
  }

  async changeSelectedBadge(
    userId: string,
    badgeId: number,
  ): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { selectedBadgeId: badgeId },
    });
    return user;
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
    if (provider === 'ALL') {
      return await this.prisma.user.findMany({
        orderBy: { createdAt: order === 'newest' ? 'desc' : 'asc' },
        take: limit,
        skip: offset,
      });
    } else {
      return await this.prisma.user.findMany({
        where: { provider },
        orderBy: { createdAt: order === 'newest' ? 'desc' : 'asc' },
        take: limit,
        skip: offset,
      });
    }
  }

  async getTotalUserListPages(provider: ProviderType | 'ALL'): Promise<number> {
    if (provider === 'ALL') {
      return await this.prisma.user.count();
    } else {
      return await this.prisma.user.count({ where: { provider } });
    }
  }
}
