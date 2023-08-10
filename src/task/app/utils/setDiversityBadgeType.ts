import { BadgeEntity } from '@admin/badge/domain/entities/badge.entity';
import { TaskType_ } from '@task/domain/entities/task.entity';

export const setDiversityBadgeType = async (
  taskType: TaskType_,
  getBadgeIdByName: (name: string) => Promise<Pick<BadgeEntity, 'id'>>,
) => {
  let diversityBadgeId: number;
  if (taskType === 'DAILY') {
    const { id } = await getBadgeIdByName('다양성 뱃지1');
    diversityBadgeId = id;
  }
  if (taskType === 'DUE') {
    const { id } = await getBadgeIdByName('다양성 뱃지2');
    diversityBadgeId = id;
  }
  if (taskType === 'FREE') {
    const { id } = await getBadgeIdByName('다양성 뱃지3');
    diversityBadgeId = id;
  }
  return diversityBadgeId;
};
