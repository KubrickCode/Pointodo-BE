import { UUID } from 'crypto';
import { BadgeProgressEntity } from '../entities/badgeProgress.entity';
import { TransactionClient } from '@shared/types/transaction.type';

export interface IBadgeProgressRepository {
  getAllBadgeProgress(userId: UUID): Promise<BadgeProgressEntity[]>;

  updateConsistency(
    userId: UUID,
    progress: number,
    badgeId: number,
    tx?: TransactionClient,
  ): Promise<number>;

  updateDiversity(
    userId: UUID,
    badgeId: number,
    tx?: TransactionClient,
  ): Promise<number>;

  updateProductivity(
    progress: number,
    userId: UUID,
    badgeId: number,
    tx?: TransactionClient,
  ): Promise<number>;
}
