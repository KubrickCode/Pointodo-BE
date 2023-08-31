import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { requestE2E } from '../request.e2e';
import * as cookieParser from 'cookie-parser';
import { TEST1_USER_LOCAL, TEST_PASSWORD } from '@shared/test/userMockData';
import { plainToClass } from 'class-transformer';
import { ResGetUserDto } from '@user/interface/dto/getUser.dto';
import { AUTH_INVALID_TOKEN } from '@shared/messages/auth/auth.errors';

describe('유저 정보 조회 in UserController (e2e)', () => {
  let app: INestApplication;
  const path = '/user';
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.use(cookieParser());
    await app.init();

    const loginResult = await requestE2E(app, '/auth/login', 'post', 201, {
      email: TEST1_USER_LOCAL.email,
      password: TEST_PASSWORD,
    });
    accessToken = loginResult.headers['set-cookie']
      .find((cookie: string) => cookie.includes('accessToken'))
      .split('accessToken=')[1]
      .split(';')[0];
  }, 30000);

  afterAll(async () => {
    await app.close();
  });

  it('유저 정보 조회 e2e 테스트', async () => {
    const response = await requestE2E(app, path, 'get', 200, null, accessToken);
    const result = plainToClass(ResGetUserDto, response.body);
    expect(result).toEqual(plainToClass(ResGetUserDto, TEST1_USER_LOCAL));
  }, 30000);

  it('유저 정보 조회 실패 e2e 테스트 - 토큰 에러', async () => {
    const response = await requestE2E(app, path, 'get', 401, null, 'token');
    expect(response.body.statusCode).toEqual(401);
    expect(response.body.message).toEqual(AUTH_INVALID_TOKEN);
    expect(response.body.path).toEqual(path);
  }, 30000);
});
