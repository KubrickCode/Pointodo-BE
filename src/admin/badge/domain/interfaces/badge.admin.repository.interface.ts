import { BadgeEntity, BadgeType_ } from '../entities/badge.entity';

export interface IBadgeAdminRepository {
  getAllBadges(): Promise<BadgeEntity[]>;
  getBadgePrice(id: number): Promise<number>;
  getBadgeIdByName(name: string): Promise<Pick<BadgeEntity, 'id'>>;
  isExist(name: string): Promise<boolean>;
  create(
    name: string,
    description: string,
    iconLink: string,
    type: BadgeType_,
    price?: number,
  ): Promise<BadgeEntity>;
  update(
    id: number,
    name?: string,
    description?: string,
    iconLink?: string,
    price?: number,
  ): Promise<BadgeEntity>;
  delete(id: number): Promise<BadgeEntity>;
}
