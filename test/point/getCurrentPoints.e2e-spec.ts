import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/App.module';
import { requestE2E } from '../request.e2e';
import cookieParser from 'cookie-parser';
import { plainToClass } from 'class-transformer';
import { setupLoggedIn } from '../setupLoggedIn.e2e';
import { validateOrReject } from 'class-validator';
import { tokenError } from '../tokenError.e2e';
import { ResGetCurrentPointsDto } from '@point/interface/dto/GetCurrentPoints.dto';

describe('유저 포인트 잔액 조회 in PointController (e2e)', () => {
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

  const path = '/points';

  it('유저 포인트 잔액 조회 성공 e2e 테스트', async () => {
    const response = await requestE2E(app, path, 'get', 200, null, accessToken);
    const result = plainToClass(ResGetCurrentPointsDto, response.body);

    expect(result).toEqual({ points: 0 });

    await validateOrReject(result);
  }, 30000);

  it(
    '유저 포인트 잔액 조회 실패 e2e 테스트 - 토큰 에러',
    async () => await tokenError(app, path, 'get'),
    30000,
  );
});
