import { BadgeProgressEntity } from '../entities/badgeProgress.entity';

export interface IBadgeProgressRepository {
  getAllBadgeProgress(
    userId: string,
  ): Promise<Array<Pick<BadgeProgressEntity, 'badgeId' | 'progress'>>>;

  updateConsistency(
    userId: string,
    isContinuous: boolean,
    badgeId: number,
  ): Promise<number>;

  updateDiversity(userId: string, badgeId: number): Promise<number>;

  updateProductivity(
    progress: number,
    userId: string,
    badgeId: number,
  ): Promise<number>;
}
