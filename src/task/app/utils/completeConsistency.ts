import { BadgeTypesEntity } from '@admin/badge/domain/entities/badgeTypes.entity';
import { UserBadgeEntity } from '@badge/domain/entities/userBadge.entity';
import { A_MONTH, A_WEEK, A_YEAR } from '@shared/constants/task.constant';

export const completeConsistency = async (
  updatedConsistency: number,
  userId: string,
  createUserBadgeLog: (
    userId: string,
    badgeId: number,
  ) => Promise<UserBadgeEntity>,
  getBadgeIdByName: (name: string) => Promise<Pick<BadgeTypesEntity, 'id'>>,
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
