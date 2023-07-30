import { BadgeTypesEntity } from '../entities/badgeTypes.entity';

export interface IBadgeAdminRepository {
  getAllBadgeTypes(): Promise<BadgeTypesEntity[]>;
  isExist(name: string): Promise<boolean>;
  create(
    name: string,
    description: string,
    iconLink: string,
  ): Promise<BadgeTypesEntity>;
  update(req: Partial<BadgeTypesEntity>): Promise<BadgeTypesEntity>;
  delete(id: number): Promise<BadgeTypesEntity>;
}
