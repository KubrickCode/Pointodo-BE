import { UserBadgeEntity } from '@badge/domain/entities/userBadge.entity';
import { HandleDateTime } from '@shared/utils/handleDateTime';

export const completeProductivity = async (
  userId: string,
  countTasksPerDate: (userId: string, date: string) => Promise<number>,
  createUserBadgeLog: (
    userId: string,
    badgeType: string,
  ) => Promise<UserBadgeEntity>,
  updateProductivity: (
    dateCount: number,
    userId: string,
    badgeType: string,
  ) => Promise<number>,
): Promise<void> => {
  const todayTasksCount = await countTasksPerDate(
    userId,
    HandleDateTime.getToday,
  );
  const weeklyTasksCount = await countTasksPerDate(
    userId,
    HandleDateTime.getWeekAgo,
  );
  const monthTasksCount = await countTasksPerDate(
    userId,
    HandleDateTime.getAMonthAgo,
  );

  await updateProductivity(todayTasksCount, userId, '생산성 뱃지1');
  await updateProductivity(weeklyTasksCount, userId, '생산성 뱃지2');
  await updateProductivity(monthTasksCount, userId, '생산성 뱃지3');

  if (todayTasksCount === 10) {
    await createUserBadgeLog(userId, '생산성 뱃지1');
  }
  if (weeklyTasksCount === 100) {
    await createUserBadgeLog(userId, '생산성 뱃지2');
  }
  if (monthTasksCount === 500) {
    await createUserBadgeLog(userId, '생산성 뱃지3');
  }
};
