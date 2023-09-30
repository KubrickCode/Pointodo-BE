import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { requestE2E } from '../request.e2e';
import cookieParser from 'cookie-parser';
import { setupLoggedIn } from '../setupLoggedIn.e2e';
import { tokenError } from '../tokenError.e2e';
import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { BadgeErrorMessage } from '@shared/messages/badge/badge.errors';

describe('유저 뱃지 구매 in BadgeController (e2e)', () => {
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

  const userId = TEST1_USER_LOCAL.id;
  const badgeId = 42;

  it('뱃지 구매 성공 e2e 테스트', async () => {
    await requestE2E(app, `/badges/${badgeId}`, 'put', 201, null, accessToken);
    await requestE2E(
      app,
      `/admin/users/badges?userId=${userId}&badgeId=${badgeId}`,
      'delete',
      204,
      null,
      accessToken,
    );
  }, 30000);

  it('뱃지 구매 실패 e2e 테스트 - 포인트 부족', async () => {
    const response = await requestE2E(
      app,
      `/badges/2`,
      'put',
      409,
      null,
      accessToken,
    );
    expect(response.body.statusCode).toEqual(HttpStatus.CONFLICT);
    expect(response.body.message).toEqual(
      BadgeErrorMessage.BUY_BADGE_CONFLICT_POINTS,
    );
    expect(response.body.path).toEqual('/badges/2');
  }, 30000);

  it(
    '뱃지 구매 실패 e2e 테스트 - 토큰 에러',
    async () => await tokenError(app, `/badges/42`, 'put'),
    30000,
  );
});
