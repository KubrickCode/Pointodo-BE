import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/App.module';
import { requestE2E } from '../request.e2e';
import { TEST_PASSWORD } from '../../src/shared/test/UserMockData';
import cookieParser from 'cookie-parser';
import { setupLoggedIn } from '../setupLoggedIn.e2e';
import { AuthErrorMessage } from '@shared/messages/auth/Auth.errors';

describe('checkPassword in AuthController (e2e)', () => {
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

  const path = '/auth/check-password';
  const body = {
    password: TEST_PASSWORD,
  };

  it('비밀번호 체크 e2e 테스트', async () => {
    await requestE2E(app, path, 'post', 204, body, accessToken);
  }, 30000);

  it('비밀번호 체크 e2e 테스트 - 불일치', async () => {
    const response = await requestE2E(
      app,
      path,
      'post',
      401,
      { password: 'test4321!@' },
      accessToken,
    );
    expect(response.body.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    expect(response.body.message).toEqual(
      AuthErrorMessage.AUTH_INVALID_PASSWORD,
    );
    expect(response.body.path).toEqual(path);
  }, 30000);
});
