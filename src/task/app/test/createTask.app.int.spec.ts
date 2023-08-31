import { Test, TestingModule } from '@nestjs/testing';
import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { taskServiceTestModuleOptions } from './taskService.test.option';
import { TaskService } from '../task.service';
import { TaskType_ } from '@task/domain/entities/task.entity';
import {
  ReqCreateTaskAppDto,
  ResCreateTaskAppDto,
} from '@task/domain/dto/createTask.app.dto';
import { CREATE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { DUE_DATE_IN_THE_PAST } from '@shared/messages/task/task.errors';

describe('getUser', () => {
  let taskService: TaskService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule(
      taskServiceTestModuleOptions,
    ).compile();

    taskService = module.get<TaskService>(TaskService);

    await module.init();
  });

  afterAll(async () => {
    await module.close();
  });

  it('작업 생성 성공 APP에서 DB까지 - DAILY,FREE', async () => {
    const taskTypes: TaskType_[] = ['DAILY', 'FREE'];
    const randomIndex = Math.floor(Math.random() * taskTypes.length);

    const request: ReqCreateTaskAppDto = {
      userId: TEST1_USER_LOCAL.id,
      taskType: taskTypes[randomIndex],
      name: 'test',
      description: 'test',
      importance: 0,
    };

    const result = await taskService.createTask(request);
    expect(result).toBeInstanceOf(ResCreateTaskAppDto);
    expect(result.message).toEqual(CREATE_TASK_SUCCESS_MESSAGE);

    await taskService.deleteTask({ id: result.id });
  });

  it('작업 생성 성공 APP에서 DB까지 - DUE', async () => {
    const request: ReqCreateTaskAppDto = {
      userId: TEST1_USER_LOCAL.id,
      taskType: 'DUE',
      name: 'test',
      description: 'test',
      importance: 0,
      dueDate: '2099-12-30',
    };

    const result = await taskService.createTask(request);
    expect(result).toBeInstanceOf(ResCreateTaskAppDto);
    expect(result.message).toEqual(CREATE_TASK_SUCCESS_MESSAGE);

    await taskService.deleteTask({ id: result.id });
  });

  it('DUE 작업 생성 실패 APP에서 DB까지 - dueDate 현 날짜보다 과거', async () => {
    try {
      const request: ReqCreateTaskAppDto = {
        userId: TEST1_USER_LOCAL.id,
        taskType: 'DUE',
        name: 'test',
        description: 'test',
        importance: 0,
        dueDate: '1999-01-01',
      };

      await taskService.createTask(request);
    } catch (error) {
      expect(error.response.statusCode).toEqual(400);
      expect(error.response.message).toEqual(DUE_DATE_IN_THE_PAST);
      expect(error.response.error).toEqual('Bad Request');
    }
  });
});
