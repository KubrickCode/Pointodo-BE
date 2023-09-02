import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { requestE2E } from '../request.e2e';
import * as cookieParser from 'cookie-parser';
import { plainToClass } from 'class-transformer';
import { ResGetUserDto } from '@user/interface/dto/getUser.dto';
import { setupLoggedIn } from '../setupLoggedIn.e2e';
import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { validateOrReject } from 'class-validator';
import { tokenError } from '../tokenError.e2e';

describe('유저 정보 조회 in UserController (e2e)', () => {
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

  const path = '/users';

  it('유저 정보 조회 e2e 테스트', async () => {
    const response = await requestE2E(app, path, 'get', 200, null, accessToken);
    const result = plainToClass(ResGetUserDto, response.body);

    expect(result).toEqual(TEST1_USER_LOCAL);

    await validateOrReject(result);
  }, 30000);

  it(
    '유저 정보 조회 실패 e2e 테스트 - 토큰 에러',
    async () => await tokenError(app, path, 'get'),
    30000,
  );
});
