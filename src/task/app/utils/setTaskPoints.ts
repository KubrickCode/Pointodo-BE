export const setTaskPoints = (
  taskType: string,
  isContinuous: boolean,
): number => {
  let points: number;
  if (taskType === '매일 작업') points = isContinuous ? 2 : 1;
  if (taskType === '기한 작업') points = isContinuous ? 4 : 3;
  if (taskType === '무기한 작업') points = isContinuous ? 6 : 5;
  return points;
};
