import { TaskConstant } from '@shared/constants/Task.constant';
import { TaskType_ } from '@task/domain/entities/Task.entity';

export const setTaskPoints = (
  taskType: TaskType_,
  isContinuous: boolean,
): number => {
  let points: number;
  if (taskType === 'DAILY')
    points = isContinuous
      ? TaskConstant.DAILY_TASK_CONSISTENCY_POINT
      : TaskConstant.DAILY_TASK_POINT;
  if (taskType === 'DUE')
    points = isContinuous
      ? TaskConstant.DEADLINE_TASK_CONSISTENCY_POINT
      : TaskConstant.DEADLINE_TASK_POINT;
  if (taskType === 'FREE')
    points = isContinuous
      ? TaskConstant.FREE_TASK_CONSISTENCY_POINT
      : TaskConstant.FREE_TASK_POINT;
  return points;
};
