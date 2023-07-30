import { UserBadgeEntity } from '@badge/domain/entities/userBadge.entity';
import { IUserBadgeRepository } from '@badge/domain/interfaces/userBadge.repository.interface';
import { Injectable } from '@nestjs/common';
import { UserBadgesLogs } from '@prisma/client';
import { PrismaService } from '@shared/service/prisma.service';

@Injectable()
export class UserBadgeRepository implements IUserBadgeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUserBadgeLog(
    userId: string,
    badgeType: string,
  ): Promise<UserBadgeEntity> {
    const query = `
      INSERT INTO "UserBadgesLogs" ("userId", "badgeType")
      VALUES ($1::uuid, $2)
      RETURNING *
    `;
    const values = [userId, badgeType];
    const newUserBadgeLog = await this.prisma.$queryRawUnsafe<UserBadgesLogs>(
      query,
      ...values,
    );
    return newUserBadgeLog[0];
  }
}
