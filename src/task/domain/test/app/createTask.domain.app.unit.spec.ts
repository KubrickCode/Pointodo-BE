import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { ITaskService } from '@task/domain/interfaces/task.service.interface';
import { mockTaskService } from './taskService.mock';
import {
  ReqCreateTaskAppDto,
  ResCreateTaskAppDto,
} from '@task/domain/dto/createTask.app.dto';
import { TaskType_ } from '@task/domain/entities/task.entity';
import { CREATE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';

describe('createTask', () => {
  const taskService: ITaskService = mockTaskService;

  it('작업 생성 성공', async () => {
    const taskTypes: TaskType_[] = ['DAILY', 'FREE', 'DUE'];
    const randomIndex = Math.floor(Math.random() * taskTypes.length);

    const req: ReqCreateTaskAppDto = {
      userId: TEST1_USER_LOCAL.id,
      taskType: taskTypes[randomIndex],
      name: 'test',
      description: 'test',
      importance: 0,
    };

    const createdTask: ResCreateTaskAppDto = {
      id: 1,
      message: CREATE_TASK_SUCCESS_MESSAGE,
    };

    jest.spyOn(taskService, 'createTask').mockResolvedValue(createdTask);

    const createdTaskResult = await taskService.createTask(req);

    expect(createdTaskResult).toEqual(createdTask);
    expect(taskService.createTask).toHaveBeenCalledWith(req);
  });
});
