import { BadgeProgressEntity } from '../entities/badgeProgress.entity';

export interface IBadgeProgressRepository {
  createBadgeProgress(
    req: Partial<BadgeProgressEntity>,
  ): Promise<BadgeProgressEntity>;
  // updateBadgeProgress(id: number): Promise<BadgeProgressEntity>;
  // deleteBadgeProgress(id: number): Promise<BadgeProgressEntity>;
}
