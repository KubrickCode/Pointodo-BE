import { BadgeTypesEntity } from '../entities/badgeTypes.entity';

export interface IBadgeAdminRepository {
  create(req: BadgeTypesEntity): Promise<BadgeTypesEntity>;
  update(req: Partial<BadgeTypesEntity>): Promise<BadgeTypesEntity>;
  delete(id: number): Promise<BadgeTypesEntity>;
}
