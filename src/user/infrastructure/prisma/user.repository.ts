import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/prisma.service';
import { Provider, User } from '@prisma/client';
import { IUserRepository } from '@user/domain/interfaces/user.repository.interface';
import {
  ProviderType,
  TopOfUserOnDate,
  UserEntity,
} from '@user/domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UUID } from 'crypto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: UUID): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        selectedBadge: {
          select: { iconLink: true },
        },
      },
    });
    return plainToClass(UserEntity, user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return plainToClass(UserEntity, user);
  }

  async findPasswordById(id: UUID): Promise<string> {
    const result = await this.prisma.userPassword.findUnique({
      where: { userId: id },
      select: { password: true },
    });
    return result?.password ?? null;
  }

  async createUser(
    email: string,
    password?: string,
    provider?: ProviderType,
  ): Promise<UserEntity> {
    provider = Provider[provider] || Provider['LOCAL'];
    const uuid = uuidv4();

    const result = await this.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: { id: uuid, email, provider },
      });

      if (password)
        await tx.userPassword.create({
          data: { userId: newUser.id, password },
        });

      return newUser;
    });

    return plainToClass(UserEntity, result);
  }

  async changePassword(id: UUID, newPassword: string): Promise<void> {
    await this.prisma.userPassword.update({
      where: { userId: id },
      data: { password: newPassword },
    });
  }

  async deleteUser(id: UUID): Promise<UserEntity> {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    return plainToClass(UserEntity, deletedUser);
  }

  async changeSelectedBadge(
    userId: UUID,
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

    return result.map((item) => plainToClass(UserEntity, item));
  }

  async getTotalUserListPages(provider: ProviderType | 'ALL'): Promise<number> {
    if (provider === 'ALL') {
      return await this.prisma.user.count();
    } else {
      return await this.prisma.user.count({ where: { provider } });
    }
  }

  async getTopUsersOnDate(
    startDate: string,
    endDate: string,
  ): Promise<TopOfUserOnDate[]> {
    const topUsers = await this.prisma.earnedPointsLogs.groupBy({
      by: ['userId'],
      where: {
        occurredAt: {
          gte: new Date(startDate),
          lt: new Date(endDate),
        },
      },
      _sum: {
        points: true,
      },
      orderBy: {
        _sum: {
          points: 'desc',
        },
      },
      take: 10,
    });

    const topUsersWithEmail = await this.prisma.user.findMany({
      where: {
        id: {
          in: topUsers.map((user) => user.userId),
        },
      },
      select: {
        id: true,
        email: true,
      },
    });

    const result = topUsers.map((user) =>
      plainToClass(TopOfUserOnDate, {
        userId: user.userId,
        email: topUsersWithEmail.find((u) => u.id === user.userId).email,
        points: user._sum.points,
      }),
    );

    return result;
  }
}
