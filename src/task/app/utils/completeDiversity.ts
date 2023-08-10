import { BadgeEntity } from '@admin/badge/domain/entities/badge.entity';
import { UserBadgeEntity } from '@badge/domain/entities/userBadge.entity';
import { DIVERSITY_GOAL } from '@shared/constants/task.constant';
import { TaskType_ } from '@task/domain/entities/task.entity';

export const completeDiversity = async (
  updatedDiversity: number,
  taskType: TaskType_,
  userId: string,
  createUserBadgeLog: (
    userId: string,
    badgeId: number,
  ) => Promise<UserBadgeEntity>,
  getBadgeIdByName: (name: string) => Promise<Pick<BadgeEntity, 'id'>>,
) => {
  if (updatedDiversity === DIVERSITY_GOAL) {
    if (taskType === 'DAILY') {
      const { id } = await getBadgeIdByName('다양성 뱃지1');
      await createUserBadgeLog(userId, id);
    }
    if (taskType === 'DUE') {
      const { id } = await getBadgeIdByName('다양성 뱃지2');
      await createUserBadgeLog(userId, id);
    }
    if (taskType === 'FREE') {
      const { id } = await getBadgeIdByName('다양성 뱃지3');
      await createUserBadgeLog(userId, id);
    }
  }
};
