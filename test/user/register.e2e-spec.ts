import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { REGISTER_SUCCESS_MESSAGE } from '@shared/messages/user/user.messages';
import { USER_ALREADY_EXIST } from '@shared/messages/user/user.errors';
import {
  VALIDATE_EMAIL,
  VALIDATE_PASSWORD,
} from '@shared/messages/auth/auth.messages';
import { requestE2E } from '../request.e2e';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const path = '/user/register';
  const body = { email: 'test@test.com', password: 'test1234!@' };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    const loginResult = await requestE2E(app, '/auth/login', 'post', 201, body);
    await requestE2E(
      app,
      '/user',
      'delete',
      200,
      null,
      loginResult.body.accessToken,
    );

    await app.close();
  });

  it('회원가입 e2e 테스트', async () => {
    const response = await requestE2E(app, path, 'post', 201, body);

    expect(response.body.message).toEqual(REGISTER_SUCCESS_MESSAGE);
  });

  it('회원가입 중복 e2e 테스트', async () => {
    const response = await requestE2E(app, path, 'post', 409, body);

    expect(response.body.statusCode).toEqual(409);
    expect(response.body.message).toEqual(USER_ALREADY_EXIST);
    expect(response.body.path).toEqual(path);
  });

  it('회원가입 유효성 검사 실패 e2e 테스트', async () => {
    const response = await requestE2E(app, path, 'post', 400, {
      email: 'qwe',
      password: 'qwe',
    });

    expect(response.body.statusCode).toEqual(400);
    expect(response.body.message).toEqual([VALIDATE_EMAIL, VALIDATE_PASSWORD]);
    expect(response.body.path).toEqual(path);
  });
});
