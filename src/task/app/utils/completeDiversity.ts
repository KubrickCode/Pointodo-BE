import { UserBadgeEntity } from '@badge/domain/entities/userBadge.entity';

export const completeDiversity = async (
  updatedDiversity: number,
  taskType: string,
  userId: string,
  createUserBadgeLog: (
    userId: string,
    badgeType: string,
  ) => Promise<UserBadgeEntity>,
) => {
  if (updatedDiversity === 100) {
    if (taskType === '매일 작업') {
      await createUserBadgeLog(userId, '다양성 뱃지3');
    }
    if (taskType === '기한 작업') {
      await createUserBadgeLog(userId, '다양성 뱃지3');
    }
    if (taskType === '무기한 작업') {
      await createUserBadgeLog(userId, '다양성 뱃지3');
    }
  }
};
