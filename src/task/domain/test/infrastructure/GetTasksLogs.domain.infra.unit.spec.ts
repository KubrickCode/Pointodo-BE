import { ITaskRepository } from '@task/domain/interfaces/Task.repository.interface';
import { mockTaskRepository } from './TaskRepository.mock';
import { TEST1_USER_LOCAL } from '@shared/test/UserMockData';
import { TaskType_ } from '@task/domain/entities/Task.entity';

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
