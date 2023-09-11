import { TransactionClient } from '@shared/types/transaction.type';
import { BadgeEntity, BadgeType_ } from '../entities/badge.entity';

export interface IBadgeAdminRepository {
  getAllBadges(): Promise<BadgeEntity[]>;

  getBadgePrice(id: number, tx?: TransactionClient): Promise<number>;

  getBadgeIdByName(name: string): Promise<Pick<BadgeEntity, 'id'>>;

  isExistBadge(name: string): Promise<boolean>;

  createBadge(
    name: string,
    description: string,
    iconLink: string,
    type: BadgeType_,
    price?: number,
  ): Promise<BadgeEntity>;

  updateBadge(
    id: number,
    name?: string,
    description?: string,
    iconLink?: string,
    price?: number,
  ): Promise<BadgeEntity>;

  deleteBadge(id: number): Promise<BadgeEntity>;
}
