import { PointTransactionTypesEntity } from '../entities/pointTransactionTypes.entity';

export interface IBadgeAdminRepository {
  getAllBadgeTypes(): Promise<PointTransactionTypesEntity[]>;
  isExist(req: Partial<PointTransactionTypesEntity>): Promise<boolean>;
  create(
    req: PointTransactionTypesEntity,
  ): Promise<PointTransactionTypesEntity>;
  update(
    req: Partial<PointTransactionTypesEntity>,
  ): Promise<PointTransactionTypesEntity>;
  delete(id: number): Promise<PointTransactionTypesEntity>;
}
