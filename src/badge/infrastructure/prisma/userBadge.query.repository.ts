import { UserBadgeEntity } from '@badge/domain/entities/userBadge.entity';
import { IUserBadgeRepository } from '@badge/domain/interfaces/userBadge.repository.interface';
import { Injectable } from '@nestjs/common';
import { UserBadgesLogs } from '@prisma/client';
import { PrismaService } from '@shared/service/prisma.service';
import { plainToClass } from 'class-transformer';
import { UUID } from 'crypto';

@Injectable()
export class UserBadgeRepository implements IUserBadgeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUserBadgeLog(
    userId: UUID,
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
    userId: UUID,
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

  async getUserBadgeListWithName(
    userId: UUID,
  ): Promise<Array<{ badgeId: number; name: string }>> {
    const query = `
      SELECT u."badgeId", b.name
      FROM "UserBadgesLogs" as u
      LEFT JOIN "Badge" as b
      ON u."badgeId" = b.id
      WHERE "userId" = $1::uuid
    `;
    const values = [userId];
    const userBadgeList = await this.prisma.$queryRawUnsafe<
      Array<{ badgeId: number; name: string }>
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
    return plainToClass(UserBadgeEntity, deleteBadgeLog);
  }

  async deleteUserBadge(
    badgeId: number,
    userId: UUID,
  ): Promise<UserBadgeEntity> {
    const query = `
      DELETE FROM "UserBadgesLogs"
      WHERE "badgeId" = $1 AND "userId" = $2::uuid
    `;
    const values = [badgeId, userId];
    const deleteBadgeLog = await this.prisma.$queryRawUnsafe<UserBadgesLogs>(
      query,
      ...values,
    );
    return plainToClass(UserBadgeEntity, deleteBadgeLog);
  }
}
