import { UserBadgeEntity } from './../entities/userBadge.entity';

export interface IUserBadgeRepository {
  createUserBadgeLog(userId: string, badgeId: number): Promise<UserBadgeEntity>;

  getUserBadgeList(userId: string): Promise<Array<{ badgeId: number }>>;

  getUserBadgeListWithName(
    userId: string,
  ): Promise<Array<{ badgeId: number; name: string }>>;

  deleteUserBadgeLog(id: number): Promise<UserBadgeEntity>;
  deleteUserBadge(badgeId: number, userId: string): Promise<UserBadgeEntity>;
}
