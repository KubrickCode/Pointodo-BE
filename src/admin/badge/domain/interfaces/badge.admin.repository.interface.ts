import { BadgeTypesEntity } from '../entities/badgeTypes.entity';

export interface IBadgeAdminRepository {
  getAllBadgeTypes(): Promise<BadgeTypesEntity[]>;
  getBadgePrice(name: string): Promise<number>;
  isExist(name: string): Promise<boolean>;
  create(
    name: string,
    description: string,
    iconLink: string,
    price?: number,
  ): Promise<BadgeTypesEntity>;
  update(
    id: number,
    name?: string,
    description?: string,
    iconLink?: string,
  ): Promise<BadgeTypesEntity>;
  delete(id: number): Promise<BadgeTypesEntity>;
}
