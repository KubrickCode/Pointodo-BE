import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/Prisma.service';
import { BadgeProgressEntity } from '@badge/domain/entities/BadgeProgress.entity';
import { IBadgeProgressRepository } from '@badge/domain/interfaces/BadgeProgress.repository.interface';
import { BadgeProgress } from '@prisma/client';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BadgeProgressRepository implements IBadgeProgressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBadgeProgress(userId: string): Promise<BadgeProgressEntity[]> {
    const query = `
    SELECT * FROM "BadgeProgress"
    WHERE "userId" = $1::uuid
    `;
    const values = [userId];
    const badgeProgressList = await this.prisma.$queryRawUnsafe<
      Array<BadgeProgress>
    >(query, ...values);
    return badgeProgressList.map((item) =>
      plainToClass(BadgeProgressEntity, item),
    );
  }

  async updateConsistency(
    userId: string,
    progress: number,
    badgeId: number,
  ): Promise<number> {
    const consistencyQuery = `
        INSERT INTO "BadgeProgress"("userId", "badgeId", progress)
        VALUES ($1::uuid, $2, 1)
        ON CONFLICT ("userId", "badgeId")
        DO UPDATE 
        SET progress = ${progress}
        RETURNING progress
      `;

    const consistencyValues = [userId, badgeId];

    const updatedBadgeProgress =
      await this.prisma.$queryRawUnsafe<BadgeProgress>(
        consistencyQuery,
        ...consistencyValues,
      );

    return updatedBadgeProgress[0].progress;
  }

  async updateDiversity(userId: string, badgeId: number): Promise<number> {
    const diversityQuery = `
        INSERT INTO "BadgeProgress"("userId", "badgeId", progress)
        VALUES ($1::uuid, $2, 1)
        ON CONFLICT ("userId", "badgeId")
        DO UPDATE
        SET progress = "BadgeProgress".progress + 1
        RETURNING progress
      `;

    const diversityValues = [userId, badgeId];

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
    badgeId: number,
  ): Promise<number> {
    const productivityQuery = `
        INSERT INTO "BadgeProgress"("userId", "badgeId", progress)
        VALUES ($2::uuid, $3, 1)
        ON CONFLICT ("userId", "badgeId")
        DO UPDATE
        SET progress = $1
        RETURNING progress
      `;

    const productivityValues = [progress, userId, badgeId];
    const updatedBadgeProgress = await this.prisma.$queryRawUnsafe<any>(
      productivityQuery,
      ...productivityValues,
    );

    return updatedBadgeProgress[0].progress;
  }
}
