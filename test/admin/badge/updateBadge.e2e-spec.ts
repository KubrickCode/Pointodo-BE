import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';
import { requestE2E } from '../../request.e2e';
import cookieParser from 'cookie-parser';
import { plainToClass } from 'class-transformer';
import { setupLoggedIn } from '../../setupLoggedIn.e2e';
import { validateOrReject } from 'class-validator';
import { tokenError } from '../../tokenError.e2e';
import { ReqAdminCreateBadgeDto } from '@admin/interface/dto/badge/createBadge.admin.dto';
import { TEST4_USER_LOCAL, TEST_PASSWORD } from '@shared/test/userMockData';
import { AuthErrorMessage } from '@shared/messages/auth/auth.errors';
import { ResForbiddenAdmin } from '@admin/interface/dto/admin.dto';
import { BadgeAdminErrorMessage } from '@shared/messages/admin/badge.admin.errors';
import { mockBadge } from '@shared/test/badgeMockData';
import {
  ReqAdminUpdateBadgeDto,
  ResAdminUpdateBadgeConflict,
} from '@admin/interface/dto/badge/updateBadge.admin.dto';

describe('어드민 뱃지 업데이트 in BadgeAdminController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let id: number;

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

  const path = '/admin/badges';

  afterAll(async () => {
    await requestE2E(app, path + `/${id}`, 'delete', 204, null, accessToken);
    await app.close();
  });

  const { name, description, iconLink, type, price } = mockBadge;

  const createBody: ReqAdminCreateBadgeDto = {
    name,
    description,
    iconLink,
    type,
    price,
  };

  const updateBody: ReqAdminUpdateBadgeDto = {
    name: name + '1',
    description: description + '1',
    iconLink: iconLink + '1',
    price: price + 1,
  };

  it('어드민 뱃지 업데이트 성공 e2e 테스트', async () => {
    const createdBadge = await requestE2E(
      app,
      path,
      'post',
      201,
      createBody,
      accessToken,
    );

    id = createdBadge.header.location;

    await requestE2E(
      app,
      path + `/${id}`,
      'patch',
      204,
      updateBody,
      accessToken,
    );
  }, 30000);

  it('어드민 뱃지 업데이트 실패 e2e 테스트 - 중복 이름', async () => {
    const response = await requestE2E(
      app,
      path + `/${id}`,
      'patch',
      409,
      { ...updateBody, name: '기본 뱃지' },
      accessToken,
    );

    expect(response.body.statusCode).toEqual(409);
    expect(response.body.message).toEqual(
      BadgeAdminErrorMessage.CONFLICT_BADGE_NAME,
    );
    expect(response.body.path).toEqual(path + `/${id}`);
    await validateOrReject(
      plainToClass(ResAdminUpdateBadgeConflict, response.body),
    );
  }, 30000);

  it('어드민 뱃지 업데이트 실패 e2e 테스트 - 권한 접근 금지', async () => {
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
      path + `/${id}`,
      'patch',
      403,
      updateBody,
      accessToken,
    );

    expect(response.body.statusCode).toEqual(403);
    expect(response.body.message).toEqual(AuthErrorMessage.AUTH_INVALID_ADMIN);
    expect(response.body.path).toEqual(path + `/${id}`);

    await validateOrReject(plainToClass(ResForbiddenAdmin, response.body));
  }, 30000);

  it(
    '어드민 뱃지 업데이트 실패 e2e 테스트 - 토큰 에러',
    async () => await tokenError(app, path + `/${id}`, 'patch'),
    30000,
  );
});
