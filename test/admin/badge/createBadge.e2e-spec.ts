import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';
import { requestE2E } from '../../request.e2e';
import * as cookieParser from 'cookie-parser';
import { plainToClass } from 'class-transformer';
import { setupLoggedIn } from '../../setupLoggedIn.e2e';
import { validateOrReject } from 'class-validator';
import { tokenError } from '../../tokenError.e2e';
import {
  ReqAdminCreateBadgeDto,
  ResCreateBadgeConflict,
} from '@admin/interface/dto/badge/createBadge.admin.dto';
import { TEST4_USER_LOCAL, TEST_PASSWORD } from '@shared/test/userMockData';
import { AUTH_INVALID_ADMIN } from '@shared/messages/auth/auth.errors';
import { ResForbiddenAdmin } from '@admin/interface/dto/admin.dto';
import { CONFLICT_BADGE_NAME } from '@shared/messages/admin/badge.admin.errors';
import { mockBadge } from '@shared/test/badgeMockData';

describe('어드민 뱃지 생성 in BadgeAdminController (e2e)', () => {
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

  const path = '/admin/badges';

  const { name, description, iconLink, type, price } = mockBadge;

  const body: ReqAdminCreateBadgeDto = {
    name,
    description,
    iconLink,
    type,
    price,
  };

  it('어드민 뱃지 생성 성공 e2e 테스트 - NORMAL,ACHIEVEMENT', async () => {
    const response = await requestE2E(
      app,
      path,
      'post',
      201,
      body,
      accessToken,
    );

    await requestE2E(
      app,
      `/admin/badges/${response.header.location}`,
      'delete',
      204,
      null,
      accessToken,
    );
  }, 30000);

  it('어드민 뱃지 생성 성공 e2e 테스트 - SPECIAL', async () => {
    const request = { ...body, type: 'SPECIAL' };
    delete request.price;
    const response = await requestE2E(
      app,
      path,
      'post',
      201,
      request,
      accessToken,
    );

    await requestE2E(
      app,
      `/admin/badges/${response.header.location}`,
      'delete',
      204,
      null,
      accessToken,
    );
  }, 30000);

  it('어드민 뱃지 생성 실패 e2e 테스트 - 중복 이름', async () => {
    const response = await requestE2E(
      app,
      path,
      'post',
      409,
      { ...body, name: '기본 뱃지' },
      accessToken,
    );

    expect(response.body.statusCode).toEqual(409);
    expect(response.body.message).toEqual(CONFLICT_BADGE_NAME);
    expect(response.body.path).toEqual(path);
    await validateOrReject(plainToClass(ResCreateBadgeConflict, response.body));
  }, 30000);

  it('어드민 뱃지 생성 실패 e2e 테스트 - 권한 접근 금지', async () => {
    const loginResult = await requestE2E(app, '/auth/login', 'post', 201, {
      email: TEST4_USER_LOCAL.email,
      password: TEST_PASSWORD,
    });
    const accessToken = loginResult.headers['set-cookie']
      .find((cookie: string) => cookie.includes('accessToken'))
      .split('accessToken=')[1]
      .split(';')[0];

    const response = await requestE2E(
      app,
      path,
      'post',
      403,
      null,
      accessToken,
    );

    expect(response.body.statusCode).toEqual(403);
    expect(response.body.message).toEqual(AUTH_INVALID_ADMIN);
    expect(response.body.path).toEqual(path);

    await validateOrReject(plainToClass(ResForbiddenAdmin, response.body));
  }, 30000);

  it(
    '어드민 뱃지 생성 실패 e2e 테스트 - 토큰 에러',
    async () => await tokenError(app, path, 'post'),
    30000,
  );
});
