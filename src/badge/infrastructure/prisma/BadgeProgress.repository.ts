import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/Prisma.service';
import { BadgeProgressEntity } from '@badge/domain/entities/BadgeProgress.entity';
import { IBadgeProgressRepository } from '@badge/domain/interfaces/BadgeProgress.repository.interface';
import { UUID } from 'crypto';
import { plainToClass } from 'class-transformer';
import { TransactionClient } from '@shared/types/Transaction.type';

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
    tx?: TransactionClient,
  ): Promise<number> {
    const prisma = tx ?? this.prisma;
    const result = await prisma.badgeProgress.upsert({
      where: { userId_badgeId: { userId, badgeId } },
      update: { progress },
      create: { userId, badgeId, progress: 1 },
    });

    return result.progress;
  }

  async updateDiversity(
    userId: UUID,
    badgeId: number,
    tx?: TransactionClient,
  ): Promise<number> {
    const prisma = tx ?? this.prisma;
    const result = await prisma.badgeProgress.upsert({
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
    tx?: TransactionClient,
  ): Promise<number> {
    const prisma = tx ?? this.prisma;
    const result = await prisma.badgeProgress.upsert({
      where: { userId_badgeId: { userId, badgeId } },
      update: { progress },
      create: { userId, badgeId, progress: 1 },
    });

    return result.progress;
  }
}
