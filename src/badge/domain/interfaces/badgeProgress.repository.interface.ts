import { Prisma } from '@prisma/client';
import { BadgeProgressEntity } from '../entities/badgeProgress.entity';

export interface IBadgeProgressRepository {
  getAllBadgeProgress(
    userId: string,
  ): Promise<Array<Pick<BadgeProgressEntity, 'badgeType' | 'progress'>>>;

  createBadgeProgress(
    userId: string,
    badgeType: string,
  ): Promise<BadgeProgressEntity>;

  updateConsistency(
    userId: string,
    isContinuous: boolean,
    tx?: Prisma.TransactionClient,
  ): Promise<number>;

  updateDiversity(
    userId: string,
    badgeType: string,
    tx?: Prisma.TransactionClient,
  ): Promise<number>;

  updateProductivity(
    progress: number,
    userId: string,
    badgeType: string,
    tx?: Prisma.TransactionClient,
  ): Promise<number>;
}
