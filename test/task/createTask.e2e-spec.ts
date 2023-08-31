import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { requestE2E } from '../request.e2e';
import * as cookieParser from 'cookie-parser';
import { TaskType_ } from '@task/domain/entities/task.entity';
import {
  ReqCreateTaskDto,
  ResCreateTaskDto,
} from '@task/interface/dto/createTask.dto';
import { CREATE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ResInvalidation } from '@shared/dto/global.dto';
import { DUE_DATE_IN_THE_PAST } from '@shared/messages/task/task.errors';
import { setupLoggedIn } from '../setupLoggedIn.e2e';
import { tokenError } from '../tokenError.e2e';

describe('createTask in taskController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.use(cookieParser());

    await app.init();

    accessToken = await setupLoggedIn(app);
  }, 30000);

  afterAll(async () => {
    await app.close();
  });

  const path = '/task/create';
  const taskTypes: TaskType_[] = ['DAILY', 'FREE'];
  const randomIndex = Math.floor(Math.random() * taskTypes.length);

  const request: ReqCreateTaskDto = {
    taskType: taskTypes[randomIndex],
    name: 'test',
    description: 'test',
    importance: 0,
    dueDate: '2099-12-30',
  };

  it('작업 생성 성공 e2e 테스트 - DAILY,FREE', async () => {
    const body = { ...request };
    delete body.dueDate;
    const response = await requestE2E(
      app,
      path,
      'post',
      201,
      body,
      accessToken,
    );

    expect(response.body.message).toEqual(CREATE_TASK_SUCCESS_MESSAGE);

    await validateOrReject(plainToClass(ResCreateTaskDto, response.body));

    await requestE2E(
      app,
      `/task/${response.body.id}`,
      'delete',
      200,
      null,
      accessToken,
    );
  }, 30000);

  it('작업 생성 성공 e2e 테스트 - DUE', async () => {
    const body = { ...request, taskType: 'DUE' };
    const response = await requestE2E(
      app,
      path,
      'post',
      201,
      body,
      accessToken,
    );

    expect(response.body.message).toEqual(CREATE_TASK_SUCCESS_MESSAGE);

    await validateOrReject(plainToClass(ResCreateTaskDto, response.body));

    await requestE2E(
      app,
      `/task/${response.body.id}`,
      'delete',
      200,
      null,
      accessToken,
    );
  }, 30000);

  it('작업 생성 실패 e2e 테스트 - name 없음', async () => {
    const body = { ...request, name: null };
    delete body.dueDate;
    const response = await requestE2E(
      app,
      path,
      'post',
      400,
      body,
      accessToken,
    );

    expect(response.body.statusCode).toEqual(400);
    expect(response.body.message.length).toEqual(1);
    expect(response.body.path).toEqual(path);

    await validateOrReject(plainToClass(ResInvalidation, response.body));
  }, 30000);

  it('작업 생성 실패 e2e 테스트 - importance 없음', async () => {
    const body = { ...request, importance: null };
    delete body.dueDate;
    const response = await requestE2E(
      app,
      path,
      'post',
      400,
      body,
      accessToken,
    );

    expect(response.body.statusCode).toEqual(400);
    expect(response.body.message.length).toEqual(1);
    expect(response.body.path).toEqual(path);

    await validateOrReject(plainToClass(ResInvalidation, response.body));
  }, 30000);

  it('작업 생성 실패 e2e 테스트 - 유효성 검사 실패(name, description)', async () => {
    const body = { ...request, name: 1, description: 1 };
    delete body.dueDate;
    const response = await requestE2E(
      app,
      path,
      'post',
      400,
      body,
      accessToken,
    );

    expect(response.body.statusCode).toEqual(400);
    expect(response.body.message.length).toEqual(2);
    expect(response.body.path).toEqual(path);

    await validateOrReject(plainToClass(ResInvalidation, response.body));
  }, 30000);

  it('작업 생성 실패 e2e 테스트 - dueDate 기한 오류', async () => {
    const body = { ...request, taskType: 'DUE', dueDate: '1999-01-01' };
    const response = await requestE2E(
      app,
      path,
      'post',
      400,
      body,
      accessToken,
    );

    expect(response.body.statusCode).toEqual(400);
    expect(response.body.message[0]).toEqual(DUE_DATE_IN_THE_PAST);
    expect(response.body.path).toEqual(path);

    await validateOrReject(plainToClass(ResInvalidation, response.body));
  }, 30000);

  it(
    '작업 생성 실패 e2e 테스트 - 토큰 에러',
    async () => await tokenError(app, path, 'post'),
    30000,
  );
});
