import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/prisma.service';
import { BadgeProgressEntity } from '@badge/domain/entities/badgeProgress.entity';
import { IBadgeProgressRepository } from '@badge/domain/interfaces/badgeProgress.repository.interface';
import { BadgeProgress } from '@prisma/client';

@Injectable()
export class BadgeProgressRepository implements IBadgeProgressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createBadgeProgress(
    req: Partial<BadgeProgressEntity>,
  ): Promise<BadgeProgressEntity> {
    const { userId, badgeType } = req;
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
  ): Promise<BadgeProgressEntity> {
    const consistencyQuery = `
        UPDATE "BadgeProgress"
        SET progress = ${isContinuous ? 'progress + 1' : '1'}
        WHERE "userId" = $1::uuid AND "badgeId" = 3
        RETURNING *
      `;

    const consistencyValues = [userId];

    const updatedBadgeProgress =
      await this.prisma.$queryRawUnsafe<BadgeProgress>(
        consistencyQuery,
        ...consistencyValues,
      );

    return updatedBadgeProgress[0];
  }

  async updateDiversity(
    userId: string,
    badgeId: number,
  ): Promise<BadgeProgressEntity> {
    const diversityQuery = `
          UPDATE "BadgeProgress"
          SET progress = progress + 1
          WHERE "userId" = $1::uuid AND "badgeId" = $2
        `;

    const diversityValues = [userId, badgeId];

    const updatedBadgeProgress =
      await this.prisma.$queryRawUnsafe<BadgeProgress>(
        diversityQuery,
        ...diversityValues,
      );

    return updatedBadgeProgress[0];
  }

  async updateProductivity(
    progress: number,
    userId: string,
    badgeId: number,
  ): Promise<BadgeProgressEntity> {
    const productivityQuery = `
        UPDATE "BadgeProgress"
        SET progress = $1
        WHERE "userId" = $2::uuid AND "badgeId" = $3
      `;

    const productivityValues = [progress, userId, badgeId];
    const updatedBadgeProgress = await this.prisma.$queryRawUnsafe<any>(
      productivityQuery,
      ...productivityValues,
    );

    return updatedBadgeProgress[0];
  }
}
