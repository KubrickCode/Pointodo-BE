import { Prisma } from '@prisma/client';
import { UserBadgeEntity } from './../entities/userBadge.entity';

export interface IUserBadgeRepository {
  createUserBadgeLog(
    userId: string,
    badgeType: string,
    tx?: Prisma.TransactionClient,
  ): Promise<UserBadgeEntity>;

  getUserBadgeList(userId: string): Promise<Array<{ badgeType: string }>>;
}
