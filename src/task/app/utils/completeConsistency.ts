import { UserBadgeEntity } from '@badge/domain/entities/userBadge.entity';
import { Prisma } from '@prisma/client';
import { A_MONTH, A_WEEK, A_YEAR } from '@shared/constants/task.constant';

export const completeConsistency = async (
  updatedConsistency: number,
  userId: string,
  createUserBadgeLog: (
    userId: string,
    badgeType: string,
    tx?: Prisma.TransactionClient,
  ) => Promise<UserBadgeEntity>,
  tx?: Prisma.TransactionClient,
) => {
  if (updatedConsistency === A_WEEK) {
    await createUserBadgeLog(userId, '일관성 뱃지1', tx);
  }
  if (updatedConsistency === A_MONTH) {
    await createUserBadgeLog(userId, '일관성 뱃지2', tx);
  }
  if (updatedConsistency === A_YEAR) {
    await createUserBadgeLog(userId, '일관성 뱃지3', tx);
  }
};
