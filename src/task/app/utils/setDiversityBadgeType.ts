import { BadgeTypesEntity } from '@admin/badge/domain/entities/badgeTypes.entity';

export const setDiversityBadgeType = async (
  taskType: string,
  getBadgeIdByName: (name: string) => Promise<Pick<BadgeTypesEntity, 'id'>>,
) => {
  let diversityBadgeId: number;
  if (taskType === '매일 작업') {
    const { id } = await getBadgeIdByName('다양성 뱃지1');
    diversityBadgeId = id;
  }
  if (taskType === '기한 작업') {
    const { id } = await getBadgeIdByName('다양성 뱃지2');
    diversityBadgeId = id;
  }
  if (taskType === '무기한 작업') {
    const { id } = await getBadgeIdByName('다양성 뱃지3');
    diversityBadgeId = id;
  }
  return diversityBadgeId;
};
