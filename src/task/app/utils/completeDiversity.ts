import { BadgeTypesEntity } from '@admin/badge/domain/entities/badgeTypes.entity';
import { UserBadgeEntity } from '@badge/domain/entities/userBadge.entity';
import { DIVERSITY_GOAL } from '@shared/constants/task.constant';

export const completeDiversity = async (
  updatedDiversity: number,
  taskType: string,
  userId: string,
  createUserBadgeLog: (
    userId: string,
    badgeId: number,
  ) => Promise<UserBadgeEntity>,
  getBadgeIdByName: (name: string) => Promise<Pick<BadgeTypesEntity, 'id'>>,
) => {
  if (updatedDiversity === DIVERSITY_GOAL) {
    if (taskType === '매일 작업') {
      const { id } = await getBadgeIdByName('다양성 뱃지1');
      await createUserBadgeLog(userId, id);
    }
    if (taskType === '기한 작업') {
      const { id } = await getBadgeIdByName('다양성 뱃지2');
      await createUserBadgeLog(userId, id);
    }
    if (taskType === '무기한 작업') {
      const { id } = await getBadgeIdByName('다양성 뱃지3');
      await createUserBadgeLog(userId, id);
    }
  }
};
