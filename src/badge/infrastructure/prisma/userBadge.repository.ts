import { UserBadgeEntity } from '@badge/domain/entities/userBadge.entity';
import { IUserBadgeRepository } from '@badge/domain/interfaces/userBadge.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/prisma.service';

@Injectable()
export class UserBadgeRepository implements IUserBadgeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUserBadgeLog(
    userId: string,
    badgeId: number,
  ): Promise<UserBadgeEntity> {
    return await this.prisma.userBadgesLogs.create({
      data: { userId, badgeId },
    });
  }

  async getUserBadgeList(
    userId: string,
  ): Promise<Array<Pick<UserBadgeEntity, 'badgeId'>>> {
    return await this.prisma.userBadgesLogs.findMany({ where: { userId } });
  }

  async getUserBadgeListWithName(
    userId: string,
  ): Promise<Array<{ badgeId: number; name: string }>> {
    const userBadgeList = await this.prisma.userBadgesLogs.findMany({
      where: {
        userId: userId,
      },
      select: {
        badgeId: true,
        badge: {
          select: {
            name: true,
          },
        },
      },
    });

    return userBadgeList.map((log) => ({
      badgeId: log.badgeId,
      name: log.badge.name,
    }));
  }

  async deleteUserBadgeLog(id: number): Promise<UserBadgeEntity> {
    return await this.prisma.userBadgesLogs.delete({ where: { id } });
  }

  async deleteUserBadge(
    badgeId: number,
    userId: string,
  ): Promise<UserBadgeEntity> {
    return await this.prisma.userBadgesLogs.delete({
      where: { userId_badgeId: { userId, badgeId } },
    });
  }
}
