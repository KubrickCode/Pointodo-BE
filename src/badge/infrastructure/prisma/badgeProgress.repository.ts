import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/prisma.service';
import { BadgeProgressEntity } from '@badge/domain/entities/badgeProgress.entity';
import { IBadgeProgressRepository } from '@badge/domain/interfaces/badgeProgress.repository.interface';
import { UUID } from 'crypto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BadgeProgressRepository implements IBadgeProgressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBadgeProgress(userId: UUID): Promise<BadgeProgressEntity[]> {
    const result = await this.prisma.badgeProgress.findMany({
      where: { userId },
      select: {
        badgeId: true,
        progress: true,
        id: true,
        userId: true,
        occurredAt: true,
      },
    });
    return result.map((item) => plainToClass(BadgeProgressEntity, item));
  }

  async updateConsistency(
    userId: UUID,
    progress: number,
    badgeId: number,
  ): Promise<number> {
    const result = await this.prisma.badgeProgress.upsert({
      where: { userId_badgeId: { userId, badgeId } },
      update: { progress },
      create: { userId, badgeId, progress: 1 },
    });

    return result.progress;
  }

  async updateDiversity(userId: UUID, badgeId: number): Promise<number> {
    const result = await this.prisma.badgeProgress.upsert({
      where: { userId_badgeId: { userId, badgeId } },
      update: { progress: { increment: 1 } },
      create: { userId, badgeId, progress: 1 },
    });

    return result.progress;
  }

  async updateProductivity(
    progress: number,
    userId: UUID,
    badgeId: number,
  ): Promise<number> {
    const result = await this.prisma.badgeProgress.upsert({
      where: { userId_badgeId: { userId, badgeId } },
      update: { progress },
      create: { userId, badgeId, progress: 1 },
    });

    return result.progress;
  }
}
