import { UserBadgeLogEntity } from '@badge/domain/entities/userBadgeLog.entity';
import { IUserBadgeRepository } from '@badge/domain/interfaces/userBadge.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/prisma.service';
import { plainToClass } from 'class-transformer';
import { UUID } from 'crypto';

@Injectable()
export class UserBadgeRepository implements IUserBadgeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUserBadgeLog(
    userId: UUID,
    badgeId: number,
  ): Promise<UserBadgeLogEntity> {
    const result = await this.prisma.userBadgesLogs.create({
      data: { userId, badgeId },
    });
    return plainToClass(UserBadgeLogEntity, result);
  }

  async getUserBadgeList(
    userId: UUID,
  ): Promise<Array<Pick<UserBadgeLogEntity, 'badgeId'>>> {
    const result = await this.prisma.userBadgesLogs.findMany({
      where: { userId },
    });

    return result.map((item) => ({ badgeId: item.badgeId }));
  }

  async getUserBadgeListWithName(
    userId: UUID,
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

  async deleteUserBadgeLog(id: number): Promise<UserBadgeLogEntity> {
    const result = await this.prisma.userBadgesLogs.delete({ where: { id } });
    return plainToClass(UserBadgeLogEntity, result);
  }

  async deleteUserBadge(
    badgeId: number,
    userId: UUID,
  ): Promise<UserBadgeLogEntity> {
    const result = await this.prisma.userBadgesLogs.delete({
      where: { userId_badgeId: { userId, badgeId } },
    });
    return plainToClass(UserBadgeLogEntity, result);
  }
}
