import { BadgeTypesEntity } from '../entities/badgeTypes.entity';

export interface IBadgeAdminRepository {
  getAllBadgeTypes(): Promise<BadgeTypesEntity[]>;
  isExist(req: Partial<BadgeTypesEntity>): Promise<boolean>;
  create(req: BadgeTypesEntity): Promise<BadgeTypesEntity>;
  update(req: Partial<BadgeTypesEntity>): Promise<BadgeTypesEntity>;
  delete(id: number): Promise<BadgeTypesEntity>;
}
