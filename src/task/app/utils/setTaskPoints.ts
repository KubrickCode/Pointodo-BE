import {
  DAILY_TASK_CONSISTENCY_POINT,
  DAILY_TASK_POINT,
  DEADLINE_TASK_CONSISTENCY_POINT,
  DEADLINE_TASK_POINT,
  FREE_TASK_CONSISTENCY_POINT,
  FREE_TASK_POINT,
} from '@shared/constants/task.constant';
import { TaskType_ } from '@task/domain/entities/task.entity';

export const setTaskPoints = (
  taskType: TaskType_,
  isContinuous: boolean,
): number => {
  let points: number;
  if (taskType === 'DAILY')
    points = isContinuous ? DAILY_TASK_CONSISTENCY_POINT : DAILY_TASK_POINT;
  if (taskType === 'DUE')
    points = isContinuous
      ? DEADLINE_TASK_CONSISTENCY_POINT
      : DEADLINE_TASK_POINT;
  if (taskType === 'FREE')
    points = isContinuous ? FREE_TASK_CONSISTENCY_POINT : FREE_TASK_POINT;
  return points;
};
