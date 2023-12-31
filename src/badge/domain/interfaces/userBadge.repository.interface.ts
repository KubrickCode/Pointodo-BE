import { UUID } from 'crypto';
import { UserBadgeLogEntity } from '../entities/userBadgeLog.entity';
import { TransactionClient } from '@shared/types/transaction.type';

export interface IUserBadgeRepository {
  createUserBadgeLog(
    userId: UUID,
    badgeId: number,
    tx?: TransactionClient,
  ): Promise<UserBadgeLogEntity>;

  getUserBadgeList(
    userId: UUID,
  ): Promise<Array<Pick<UserBadgeLogEntity, 'badgeId'>>>;

  getUserBadgeListWithName(
    userId: UUID,
  ): Promise<Array<{ badgeId: number; name: string }>>;

  deleteUserBadgeLog(id: number): Promise<UserBadgeLogEntity>;

  deleteUserBadge(badgeId: number, userId: UUID): Promise<UserBadgeLogEntity>;
}
