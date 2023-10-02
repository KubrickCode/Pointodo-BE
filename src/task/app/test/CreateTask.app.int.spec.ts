import { Test, TestingModule } from '@nestjs/testing';
import { taskServiceTestModuleOptions } from './TaskService.test.option';
import { TaskService } from '../Task.service';
import {
  ReqCreateTaskAppDto,
  ResCreateTaskAppDto,
} from '@task/domain/dto/CreateTask.app.dto';
import { TaskErrorMessage } from '@shared/messages/task/Task.errors';
import { mockTask } from '@shared/test/TaskMockData';

describe('createTask', () => {
  let taskService: TaskService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule(
      taskServiceTestModuleOptions,
    ).compile();

    taskService = module.get<TaskService>(TaskService);

    await module.init();
  }, 30000);

  afterAll(async () => {
    await module.close();
  });

  it('작업 생성 성공 APP에서 DB까지 - DAILY,FREE', async () => {
    const request: ReqCreateTaskAppDto = mockTask;

    const result = await taskService.createTask(request);
    expect(result).toBeInstanceOf(ResCreateTaskAppDto);

    await taskService.deleteTask({ id: result.id });
  }, 30000);

  it('작업 생성 성공 APP에서 DB까지 - DUE', async () => {
    const request: ReqCreateTaskAppDto = {
      ...mockTask,
      taskType: 'DUE',
      dueDate: '2099-12-30',
    };

    const result = await taskService.createTask(request);
    expect(result).toBeInstanceOf(ResCreateTaskAppDto);

    await taskService.deleteTask({ id: result.id });
  }, 30000);

  it('DUE 작업 생성 실패 APP에서 DB까지 - dueDate 현 날짜보다 과거', async () => {
    try {
      const request: ReqCreateTaskAppDto = {
        ...mockTask,
        taskType: 'DUE',
        dueDate: '1999-12-30',
      };

      await taskService.createTask(request);
    } catch (error) {
      expect(error.response.statusCode).toEqual(400);
      expect(error.response.message[0]).toEqual(
        TaskErrorMessage.DUE_DATE_IN_THE_PAST,
      );
      expect(error.response.error).toEqual('Bad Request');
    }
  }, 30000);
});
