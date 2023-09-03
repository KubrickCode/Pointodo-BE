import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { USER_ALREADY_EXIST } from '@shared/messages/user/user.errors';
import {
  VALIDATE_EMAIL,
  VALIDATE_PASSWORD,
} from '@shared/messages/auth/auth.messages';
import { requestE2E } from '../request.e2e';
import cookieParser from 'cookie-parser';
import { validateOrReject } from 'class-validator';
import { ResRegisterExistUserError } from '@user/interface/dto/register.dto';
import { plainToClass } from 'class-transformer';
import { ResInvalidation } from '@shared/dto/global.dto';
import { MOCK_USER, TEST_PASSWORD } from '@shared/test/userMockData';

describe('회원가입 in UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.use(cookieParser());
    await app.init();
  }, 30000);

  afterAll(async () => {
    const loginResult = await requestE2E(app, '/auth/login', 'post', 201, body);
    const accessToken = loginResult.headers['set-cookie']
      .find((cookie: string) => cookie.includes('accessToken'))
      .split('accessToken=')[1]
      .split(';')[0];

    await requestE2E(app, '/users', 'delete', 204, null, accessToken);

    await app.close();
  });

  const path = '/users';
  const body = { email: MOCK_USER.email, password: TEST_PASSWORD };

  it('회원가입 e2e 테스트', async () => {
    await requestE2E(app, path, 'post', 201, body);
  }, 30000);

  it('회원가입 중복 e2e 테스트', async () => {
    const response = await requestE2E(app, path, 'post', 409, body);

    expect(response.body.statusCode).toEqual(409);
    expect(response.body.message).toEqual(USER_ALREADY_EXIST);
    expect(response.body.path).toEqual(path);
    await validateOrReject(
      plainToClass(ResRegisterExistUserError, response.body),
    );
  }, 30000);

  it('회원가입 유효성 검사 실패 e2e 테스트', async () => {
    const response = await requestE2E(app, path, 'post', 400, {
      email: 'qwe',
      password: 'qwe',
    });

    expect(response.body.statusCode).toEqual(400);
    expect(response.body.message).toEqual([VALIDATE_EMAIL, VALIDATE_PASSWORD]);
    expect(response.body.path).toEqual(path);
    await validateOrReject(plainToClass(ResInvalidation, response.body));
  }, 30000);
});
