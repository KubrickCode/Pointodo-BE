import { UserBadgeEntity } from '@badge/domain/entities/userBadge.entity';
import { A_MONTH, A_WEEK, A_YEAR } from '@shared/constants/task.constant';

export const completeConsistency = async (
  updatedConsistency: number,
  userId: string,
  createUserBadgeLog: (
    userId: string,
    badgeType: string,
  ) => Promise<UserBadgeEntity>,
) => {
  if (updatedConsistency === A_WEEK) {
    await createUserBadgeLog(userId, '일관성 뱃지1');
  }
  if (updatedConsistency === A_MONTH) {
    await createUserBadgeLog(userId, '일관성 뱃지2');
  }
  if (updatedConsistency === A_YEAR) {
    await createUserBadgeLog(userId, '일관성 뱃지3');
  }
};
