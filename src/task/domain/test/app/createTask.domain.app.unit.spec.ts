import { ITaskService } from '@task/domain/interfaces/task.service.interface';
import { mockTaskService } from './taskService.mock';
import {
  ReqCreateTaskAppDto,
  ResCreateTaskAppDto,
} from '@task/domain/dto/createTask.app.dto';
import { mockTask } from '@shared/test/taskMockData';

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
