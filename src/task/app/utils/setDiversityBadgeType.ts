export const setDiversityBadgeType = (taskType: string) => {
  let diversityBadgeType: string;
  if (taskType === '매일 작업') {
    diversityBadgeType = '다양성 뱃지1';
  }
  if (taskType === '기한 작업') {
    diversityBadgeType = '다양성 뱃지2';
  }
  if (taskType === '무기한 작업') {
    diversityBadgeType = '다양성 뱃지3';
  }
  return diversityBadgeType;
};
