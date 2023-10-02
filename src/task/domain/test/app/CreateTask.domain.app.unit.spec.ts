import { ITaskService } from '@task/domain/interfaces/Task.service.interface';
import { mockTaskService } from './TaskService.mock';
import {
  ReqCreateTaskAppDto,
  ResCreateTaskAppDto,
} from '@task/domain/dto/CreateTask.app.dto';
import { mockTask } from '@shared/test/TaskMockData';

describe('createTask', () => {
  const taskService: ITaskService = mockTaskService;

  it('작업 생성 성공', async () => {
    const request: ReqCreateTaskAppDto = mockTask;

    const createdTask: ResCreateTaskAppDto = {
      id: 1,
    };

    jest.spyOn(taskService, 'createTask').mockResolvedValue(createdTask);

    const createdTaskResult = await taskService.createTask(request);

    expect(createdTaskResult).toEqual(createdTask);
    expect(taskService.createTask).toHaveBeenCalledWith(request);
  });
});
