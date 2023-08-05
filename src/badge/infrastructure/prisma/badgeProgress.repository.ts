import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/prisma.service';
import { BadgeProgressEntity } from '@badge/domain/entities/badgeProgress.entity';
import { IBadgeProgressRepository } from '@badge/domain/interfaces/badgeProgress.repository.interface';
import { BadgeProgress } from '@prisma/client';

@Injectable()
export class BadgeProgressRepository implements IBadgeProgressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBadgeProgress(
    userId: string,
  ): Promise<Array<Pick<BadgeProgressEntity, 'badgeType' | 'progress'>>> {
    const query = `
    SELECT "badgeType", progress FROM "BadgeProgress"
    WHERE "userId" = $1::uuid
    `;
    const values = [userId];
    const badgeProgressList = await this.prisma.$queryRawUnsafe<
      Array<Pick<BadgeProgress, 'badgeType' | 'progress'>>
    >(query, ...values);
    return badgeProgressList;
  }

  async createBadgeProgress(
    userId: string,
    badgeType: string,
  ): Promise<BadgeProgressEntity> {
    const query = `
      INSERT INTO "BadgeProgress" ("userId", "badgeType")
      VALUES ($1::uuid, $2)
      RETURNING *
    `;
    const values = [userId, badgeType];
    const newBadgeProgress = await this.prisma.$queryRawUnsafe<BadgeProgress>(
      query,
      ...values,
    );
    return newBadgeProgress[0];
  }

  async updateConsistency(
    userId: string,
    isContinuous: boolean,
  ): Promise<number> {
    const consistencyQuery = `
        INSERT INTO "BadgeProgress"("userId", "badgeType", progress)
        VALUES ($1::uuid, '일관성 뱃지3', 1)
        ON CONFLICT ("userId", "badgeType")
        DO UPDATE 
        SET progress = ${isContinuous ? '"BadgeProgress".progress + 1' : '1'}
        RETURNING progress
      `;

    const consistencyValues = [userId];

    const updatedBadgeProgress =
      await this.prisma.$queryRawUnsafe<BadgeProgress>(
        consistencyQuery,
        ...consistencyValues,
      );

    return updatedBadgeProgress[0].progress;
  }

  async updateDiversity(userId: string, badgeType: string): Promise<number> {
    const diversityQuery = `
        INSERT INTO "BadgeProgress"("userId", "badgeType", progress)
        VALUES ($1::uuid, $2, 1)
        ON CONFLICT ("userId", "badgeType")
        DO UPDATE
        SET progress = "BadgeProgress".progress + 1
        RETURNING progress
      `;

    const diversityValues = [userId, badgeType];

    const updatedBadgeProgress =
      await this.prisma.$queryRawUnsafe<BadgeProgress>(
        diversityQuery,
        ...diversityValues,
      );

    return updatedBadgeProgress[0].progress;
  }

  async updateProductivity(
    progress: number,
    userId: string,
    badgeType: string,
  ): Promise<number> {
    const productivityQuery = `
        INSERT INTO "BadgeProgress"("userId", "badgeType", progress)
        VALUES ($2::uuid, $3, 1)
        ON CONFLICT ("userId", "badgeType")
        DO UPDATE
        SET progress = $1
        RETURNING progress
      `;

    const productivityValues = [progress, userId, badgeType];
    const updatedBadgeProgress = await this.prisma.$queryRawUnsafe<any>(
      productivityQuery,
      ...productivityValues,
    );

    return updatedBadgeProgress[0].progress;
  }
}
