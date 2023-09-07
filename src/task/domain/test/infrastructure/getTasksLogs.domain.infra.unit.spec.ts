import { ITaskRepository } from '@task/domain/interfaces/task.repository.interface';
import { mockTaskRepository } from './taskRepository.mock';
import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { TaskType_ } from '@task/domain/entities/task.entity';

describe('getTasksLogs', () => {
  const taskRepository: ITaskRepository = mockTaskRepository;

  it('작업 목록 불러오기 성공', async () => {
    // const userId = TEST1_USER_LOCAL.id;
    // const taskType:TaskType_ = 'DAILY';
    // const limit = 5;
    // const offset = 1;
    // const order = string;
    // const completion = string;
  });
});
