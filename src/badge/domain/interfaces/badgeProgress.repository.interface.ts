import { UUID } from 'crypto';
import { BadgeProgressEntity } from '../entities/badgeProgress.entity';

export interface IBadgeProgressRepository {
  getAllBadgeProgress(userId: UUID): Promise<BadgeProgressEntity[]>;

  updateConsistency(
    userId: UUID,
    isContinuous: boolean,
    badgeId: number,
  ): Promise<number>;

  updateDiversity(userId: UUID, badgeId: number): Promise<number>;

  updateProductivity(
    progress: number,
    userId: UUID,
    badgeId: number,
  ): Promise<number>;
}
