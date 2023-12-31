import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { requestE2E } from '../request.e2e';
import {
  TEST1_USER_LOCAL,
  TEST2_USER_GOOGLE,
  TEST3_USER_KAKAO,
  TEST_PASSWORD,
} from '../../src/shared/test/userMockData';
import {
  USER_EXIST_WITH_SOCIAL,
  USER_NOT_FOUND,
} from '@shared/messages/user/user.errors';
import { AUTH_INVALID_PASSWORD } from '@shared/messages/auth/auth.errors';
import cookieParser from 'cookie-parser';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {
  ResInvalidPassword,
  ResNotFoundUser,
  ResNotLocalUserLogin,
} from '@auth/interface/dto/login.dto';

describe('로그인 in AuthController (e2e)', () => {
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
    await app.close();
  });

  const path = '/auth/login';
  const body = {
    email: TEST1_USER_LOCAL.email,
    password: TEST_PASSWORD,
  };

  it('로그인 e2e 테스트', async () => {
    const response = await requestE2E(app, path, 'post', 201, body);

    expect(response.headers['set-cookie'][0]).toContain('accessToken');
    expect(response.headers['set-cookie'][1]).toContain('refreshToken');
    expect(response.statusCode).toEqual(201);
  }, 30000);

  it('로그인 e2e 테스트 - 없는 계정 오류', async () => {
    const response = await requestE2E(app, path, 'post', 404, {
      ...body,
      email: 'email@gmail.com',
    });

    expect(response.statusCode).toEqual(404);
    expect(response.body.statusCode).toEqual(404);
    expect(response.body.message).toEqual(USER_NOT_FOUND);
    expect(response.body.path).toEqual(path);

    await validateOrReject(plainToClass(ResNotFoundUser, response.body));
  }, 30000);

  it('로그인 e2e 테스트 - 비밀번호 오류', async () => {
    const response = await requestE2E(app, path, 'post', 401, {
      ...body,
      password: 'password',
    });

    expect(response.statusCode).toEqual(401);
    expect(response.body.statusCode).toEqual(401);
    expect(response.body.message).toEqual(AUTH_INVALID_PASSWORD);
    expect(response.body.path).toEqual(path);

    await validateOrReject(plainToClass(ResInvalidPassword, response.body));
  }, 30000);

  it('로그인 e2e 테스트 - 소셜 계정 오류', async () => {
    const googleResponse = await requestE2E(app, path, 'post', 409, {
      ...body,
      email: TEST2_USER_GOOGLE.email,
    });

    expect(googleResponse.statusCode).toEqual(409);
    expect(googleResponse.body.statusCode).toEqual(409);
    expect(googleResponse.body.message).toEqual(USER_EXIST_WITH_SOCIAL);
    expect(googleResponse.body.path).toEqual(path);

    await validateOrReject(
      plainToClass(ResNotLocalUserLogin, googleResponse.body),
    );

    const kakaoResponse = await requestE2E(app, path, 'post', 409, {
      ...body,
      email: TEST3_USER_KAKAO.email,
    });

    expect(kakaoResponse.statusCode).toEqual(409);
    expect(kakaoResponse.body.statusCode).toEqual(409);
    expect(kakaoResponse.body.message).toEqual(USER_EXIST_WITH_SOCIAL);
    expect(kakaoResponse.body.path).toEqual(path);

    await validateOrReject(
      plainToClass(ResNotLocalUserLogin, kakaoResponse.body),
    );
  }, 30000);
});
