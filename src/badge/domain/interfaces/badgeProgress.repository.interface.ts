import { BadgeProgressEntity } from '../entities/badgeProgress.entity';

export interface IBadgeProgressRepository {
  getAllBadgeProgress(
    userId: string,
  ): Promise<Array<Pick<BadgeProgressEntity, 'badgeType' | 'progress'>>>;

  createBadgeProgress(
    req: Partial<BadgeProgressEntity>,
  ): Promise<BadgeProgressEntity>;

  updateConsistency(userId: string, isContinuous: boolean): Promise<number>;

  updateDiversity(userId: string, badgeType: string): Promise<number>;

  updateProductivity(
    progress: number,
    userId: string,
    badgeType: string,
  ): Promise<number>;
}
