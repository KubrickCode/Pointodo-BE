import { UserBadgeEntity } from '@badge/domain/entities/userBadge.entity';
import { Prisma } from '@prisma/client';
import { DIVERSITY_GOAL } from '@shared/constants/task.constant';

export const completeDiversity = async (
  updatedDiversity: number,
  taskType: string,
  userId: string,
  createUserBadgeLog: (
    userId: string,
    badgeType: string,
    tx?: Prisma.TransactionClient,
  ) => Promise<UserBadgeEntity>,
  tx?: Prisma.TransactionClient,
) => {
  if (updatedDiversity === DIVERSITY_GOAL) {
    if (taskType === '매일 작업') {
      await createUserBadgeLog(userId, '다양성 뱃지3', tx);
    }
    if (taskType === '기한 작업') {
      await createUserBadgeLog(userId, '다양성 뱃지3', tx);
    }
    if (taskType === '무기한 작업') {
      await createUserBadgeLog(userId, '다양성 뱃지3', tx);
    }
  }
};
