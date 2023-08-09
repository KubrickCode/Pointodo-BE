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
    badgeId: number,
  ): Promise<UserBadgeEntity> {
    const query = `
      INSERT INTO "UserBadgesLogs" ("userId", "badgeId")
      VALUES ($1::uuid, $2)
      RETURNING *
    `;
    const values = [userId, badgeId];
    const newUserBadgeLog = await this.prisma.$queryRawUnsafe<UserBadgesLogs>(
      query,
      ...values,
    );
    return newUserBadgeLog[0];
  }

  async getUserBadgeList(
    userId: string,
  ): Promise<Array<Pick<UserBadgeEntity, 'badgeId'>>> {
    const query = `
      SELECT "badgeId" FROM "UserBadgesLogs"
      WHERE "userId" = $1::uuid
    `;
    const values = [userId];
    const userBadgeList = await this.prisma.$queryRawUnsafe<
      Array<Pick<UserBadgesLogs, 'badgeId'>>
    >(query, ...values);
    return userBadgeList;
  }

  async deleteUserBadgeLog(id: number): Promise<UserBadgeEntity> {
    const query = `
      DELETE FROM "UserBadgesLogs"
      WHERE id = $1
    `;
    const values = [id];
    const deleteBadgeLog = await this.prisma.$queryRawUnsafe<UserBadgesLogs>(
      query,
      ...values,
    );
    return deleteBadgeLog;
  }
}
