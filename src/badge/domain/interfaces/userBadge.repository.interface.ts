import { UserBadgeEntity } from './../entities/userBadge.entity';

export interface IUserBadgeRepository {
  createUserBadgeLog(
    userId: string,
    badgeType: string,
  ): Promise<UserBadgeEntity>;
}
