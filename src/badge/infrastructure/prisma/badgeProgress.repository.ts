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
    const { userId, badgeId } = req;
    const query = `
      INSERT INTO "BadgeProgress" ("userId", "badgeId")
      VALUES ($1::uuid, $2)
      RETURNING *
    `;
    const values = [userId, badgeId];
    const newBadgeProgress = await this.prisma.$queryRawUnsafe<BadgeProgress>(
      query,
      ...values,
    );
    return newBadgeProgress[0];
  }

  // async updateBadgeProgress(id: number): Promise<BadgeProgressEntity> {}

  // async deleteBadgeProgress(id: number): Promise<BadgeProgressEntity> {}
}
