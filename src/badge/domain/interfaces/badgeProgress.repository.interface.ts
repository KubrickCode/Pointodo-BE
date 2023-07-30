import { BadgeProgressEntity } from '../entities/badgeProgress.entity';

export interface IBadgeProgressRepository {
  createBadgeProgress(
    req: Partial<BadgeProgressEntity>,
  ): Promise<BadgeProgressEntity>;

  updateConsistency(
    userId: string,
    isContinuous: boolean,
  ): Promise<BadgeProgressEntity>;

  updateDiversity(
    userId: string,
    badgeId: number,
  ): Promise<BadgeProgressEntity>;

  updateProductivity(
    progress: number,
    userId: string,
    badgeId: number,
  ): Promise<BadgeProgressEntity>;
}
