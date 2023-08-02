import { UserBadgeEntity } from '@badge/domain/entities/userBadge.entity';

export const completeConsistency = async (
  updatedConsistency: number,
  userId: string,
  createUserBadgeLog: (
    userId: string,
    badgeType: string,
  ) => Promise<UserBadgeEntity>,
) => {
  if (updatedConsistency === 7) {
    await createUserBadgeLog(userId, '일관성 뱃지1');
  }
  if (updatedConsistency === 30) {
    await createUserBadgeLog(userId, '일관성 뱃지2');
  }
  if (updatedConsistency === 365) {
    await createUserBadgeLog(userId, '일관성 뱃지3');
  }
};
