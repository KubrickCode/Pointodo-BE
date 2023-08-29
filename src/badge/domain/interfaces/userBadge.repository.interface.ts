import { UUID } from 'crypto';
import { UserBadgeEntity } from './../entities/userBadge.entity';

export interface IUserBadgeRepository {
  createUserBadgeLog(userId: UUID, badgeId: number): Promise<UserBadgeEntity>;

  getUserBadgeList(userId: UUID): Promise<Array<{ badgeId: number }>>;

  getUserBadgeListWithName(
    userId: UUID,
  ): Promise<Array<{ badgeId: number; name: string }>>;

  deleteUserBadgeLog(id: number): Promise<UserBadgeEntity>;
  deleteUserBadge(badgeId: number, userId: UUID): Promise<UserBadgeEntity>;
}
