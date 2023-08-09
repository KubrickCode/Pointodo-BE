import { BadgeTypesEntity } from '../entities/badgeTypes.entity';

export interface IBadgeAdminRepository {
  getAllBadgeTypes(): Promise<BadgeTypesEntity[]>;
  getBadgePrice(id: number): Promise<number>;
  getBadgeIdByName(name: string): Promise<Pick<BadgeTypesEntity, 'id'>>;
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
