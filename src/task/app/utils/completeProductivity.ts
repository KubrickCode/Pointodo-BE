import { BadgeEntity } from '@admin/badge/domain/entities/badge.entity';
import { UserBadgeEntity } from '@badge/domain/entities/userBadge.entity';
import {
  PRODUCTIVITY_GOAL_FOR_A_MONTH_AGO,
  PRODUCTIVITY_GOAL_FOR_A_WEEK_AGO,
  PRODUCTIVITY_GOAL_FOR_TODAY,
} from '@shared/constants/task.constant';

export const completeProductivity = async (
  userId: string,
  countTasksPerDate: (userId: string, date: string) => Promise<number>,
  createUserBadgeLog: (
    userId: string,
    badgeId: number,
  ) => Promise<UserBadgeEntity>,
  updateProductivity: (
    dateCount: number,
    userId: string,
    badgeId: number,
  ) => Promise<number>,
  getBadgeIdByName: (name: string) => Promise<Pick<BadgeEntity, 'id'>>,
  [today, aWeekAgo, aMonthAgo]: [string, string, string],
): Promise<void> => {
  const todayTasksCount = await countTasksPerDate(userId, today);
  const weeklyTasksCount = await countTasksPerDate(userId, aWeekAgo);
  const monthTasksCount = await countTasksPerDate(userId, aMonthAgo);

  const productivityBadgeId1 = await getBadgeIdByName('생산성 뱃지1');
  const productivityBadgeId2 = await getBadgeIdByName('생산성 뱃지2');
  const productivityBadgeId3 = await getBadgeIdByName('생산성 뱃지3');

  await updateProductivity(todayTasksCount, userId, productivityBadgeId1.id);
  await updateProductivity(weeklyTasksCount, userId, productivityBadgeId2.id);
  await updateProductivity(monthTasksCount, userId, productivityBadgeId3.id);

  if (todayTasksCount === PRODUCTIVITY_GOAL_FOR_TODAY) {
    await createUserBadgeLog(userId, productivityBadgeId1.id);
  }
  if (weeklyTasksCount === PRODUCTIVITY_GOAL_FOR_A_WEEK_AGO) {
    await createUserBadgeLog(userId, productivityBadgeId2.id);
  }
  if (monthTasksCount === PRODUCTIVITY_GOAL_FOR_A_MONTH_AGO) {
    await createUserBadgeLog(userId, productivityBadgeId3.id);
  }
};
