import { UserBadgeEntity } from './../entities/userBadge.entity';

export interface IUserBadgeRepository {
  createUserBadgeLog(userId: string, badgeId: number): Promise<UserBadgeEntity>;

  getUserBadgeList(userId: string): Promise<Array<{ badgeId: number }>>;
}
