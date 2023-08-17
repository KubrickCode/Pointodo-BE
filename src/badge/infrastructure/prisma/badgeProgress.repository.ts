import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/prisma.service';
import { BadgeProgressEntity } from '@badge/domain/entities/badgeProgress.entity';
import { IBadgeProgressRepository } from '@badge/domain/interfaces/badgeProgress.repository.interface';

@Injectable()
export class BadgeProgressRepository implements IBadgeProgressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBadgeProgress(
    userId: string,
  ): Promise<Array<Pick<BadgeProgressEntity, 'badgeId' | 'progress'>>> {
    return await this.prisma.badgeProgress.findMany({
      where: { userId },
      select: {
        badgeId: true,
        progress: true,
      },
    });
  }

  async updateConsistency(
    userId: string,
    isContinuous: boolean,
    badgeId: number,
  ): Promise<number> {
    const result = await this.prisma.badgeProgress.upsert({
      where: { userId_badgeId: { userId, badgeId } },
      update: { progress: isContinuous ? { increment: 1 } : 1 },
      create: { userId, badgeId, progress: 1 },
    });

    return result.progress;
  }

  async updateDiversity(userId: string, badgeId: number): Promise<number> {
    const result = await this.prisma.badgeProgress.upsert({
      where: { userId_badgeId: { userId, badgeId } },
      update: { progress: { increment: 1 } },
      create: { userId, badgeId, progress: 1 },
    });

    return result.progress;
  }

  async updateProductivity(
    progress: number,
    userId: string,
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
