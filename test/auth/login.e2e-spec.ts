import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { requestE2E } from '../request.e2e';
import { TEST1_USER_LOCAL_WITH_PASSWORD } from '../../src/shared/test/userMockData';

describe('회원가입 in UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const path = '/auth/login';
  const body = {
    email: TEST1_USER_LOCAL_WITH_PASSWORD.email,
    password: TEST1_USER_LOCAL_WITH_PASSWORD.password,
  };

  it('로그인 e2e 테스트', async () => {
    const response = await requestE2E(app, path, 'post', 201, body);
    expect(response.headers['set-cookie'][0]).toContain('accessToken');
    expect(response.headers['set-cookie'][1]).toContain('refreshToken');
    expect(response.statusCode).toEqual(201);
  });
});
