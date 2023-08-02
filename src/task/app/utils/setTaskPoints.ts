import {
  DAILY_TASK_CONSISTENCY_POINT,
  DAILY_TASK_POINT,
  DEADLINE_TASK_CONSISTENCY_POINT,
  DEADLINE_TASK_POINT,
  FREE_TASK_CONSISTENCY_POINT,
  FREE_TASK_POINT,
} from '@shared/constants/task.constant';

export const setTaskPoints = (
  taskType: string,
  isContinuous: boolean,
): number => {
  let points: number;
  if (taskType === '매일 작업')
    points = isContinuous ? DAILY_TASK_CONSISTENCY_POINT : DAILY_TASK_POINT;
  if (taskType === '기한 작업')
    points = isContinuous
      ? DEADLINE_TASK_CONSISTENCY_POINT
      : DEADLINE_TASK_POINT;
  if (taskType === '무기한 작업')
    points = isContinuous ? FREE_TASK_CONSISTENCY_POINT : FREE_TASK_POINT;
  return points;
};
