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
        UPDATE "BadgeProgress"
        SET progress = ${isContinuous ? 'progress + 1' : '1'}
        WHERE "userId" = $1::uuid AND "badgeType" = '일관성 뱃지3'
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
          UPDATE "BadgeProgress"
          SET progress = progress + 1
          WHERE "userId" = $1::uuid AND "badgeType" = $2
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
        UPDATE "BadgeProgress"
        SET progress = $1
        WHERE "userId" = $2::uuid AND "badgeType" = $3
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
