import { BadgeEntity } from '@admin/badge/domain/entities/badge.entity';
import { UserBadgeLogEntity } from '@badge/domain/entities/userBadgeLog.entity';
import { A_MONTH, A_WEEK, A_YEAR } from '@shared/constants/task.constant';

export const completeConsistency = async (
  updatedConsistency: number,
  userId: string,
  createUserBadgeLog: (
    userId: string,
    badgeId: number,
  ) => Promise<UserBadgeLogEntity>,
  getBadgeIdByName: (name: string) => Promise<Pick<BadgeEntity, 'id'>>,
) => {
  if (updatedConsistency === A_WEEK) {
    const badgeId = await getBadgeIdByName('일관성 뱃지1');
    await createUserBadgeLog(userId, badgeId.id);
  }
  if (updatedConsistency === A_MONTH) {
    const badgeId = await getBadgeIdByName('일관성 뱃지2');
    await createUserBadgeLog(userId, badgeId.id);
  }
  if (updatedConsistency === A_YEAR) {
    const badgeId = await getBadgeIdByName('일관성 뱃지3');
    await createUserBadgeLog(userId, badgeId.id);
  }
};
