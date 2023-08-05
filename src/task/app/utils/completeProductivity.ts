import { UserBadgeEntity } from '@badge/domain/entities/userBadge.entity';
import { Prisma } from '@prisma/client';
import {
  PRODUCTIVITY_GOAL_FOR_A_MONTH_AGO,
  PRODUCTIVITY_GOAL_FOR_A_WEEK_AGO,
  PRODUCTIVITY_GOAL_FOR_TODAY,
} from '@shared/constants/task.constant';
import { HandleDateTime } from '@shared/utils/handleDateTime';

export const completeProductivity = async (
  userId: string,
  countTasksPerDate: (
    userId: string,
    date: string,
    tx?: Prisma.TransactionClient,
  ) => Promise<number>,
  createUserBadgeLog: (
    userId: string,
    badgeType: string,
    tx?: Prisma.TransactionClient,
  ) => Promise<UserBadgeEntity>,
  updateProductivity: (
    dateCount: number,
    userId: string,
    badgeType: string,
    tx?: Prisma.TransactionClient,
  ) => Promise<number>,
  tx?: Prisma.TransactionClient,
): Promise<void> => {
  const todayTasksCount = await countTasksPerDate(
    userId,
    HandleDateTime.getToday,
    tx,
  );
  const weeklyTasksCount = await countTasksPerDate(
    userId,
    HandleDateTime.getAWeekAgo,
    tx,
  );
  const monthTasksCount = await countTasksPerDate(
    userId,
    HandleDateTime.getAMonthAgo,
    tx,
  );

  await updateProductivity(todayTasksCount, userId, '생산성 뱃지1', tx);
  await updateProductivity(weeklyTasksCount, userId, '생산성 뱃지2', tx);
  await updateProductivity(monthTasksCount, userId, '생산성 뱃지3', tx);

  if (todayTasksCount === PRODUCTIVITY_GOAL_FOR_TODAY) {
    await createUserBadgeLog(userId, '생산성 뱃지1', tx);
  }
  if (weeklyTasksCount === PRODUCTIVITY_GOAL_FOR_A_WEEK_AGO) {
    await createUserBadgeLog(userId, '생산성 뱃지2', tx);
  }
  if (monthTasksCount === PRODUCTIVITY_GOAL_FOR_A_MONTH_AGO) {
    await createUserBadgeLog(userId, '생산성 뱃지3', tx);
  }
};
