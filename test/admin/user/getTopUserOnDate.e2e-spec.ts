import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';
import { requestE2E } from '../../request.e2e';
import cookieParser from 'cookie-parser';
import { setupLoggedIn } from '../../setupLoggedIn.e2e';
import {
  ReqGetTopUsersOnDateQueryDto,
  ResGetTopUsersOnDateDto,
} from '@admin/interface/dto/user/getTopUserOnDate.dto';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';

describe('이달의 유저 불러오기 in BadgeAdminController (e2e)', () => {
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

  const query: ReqGetTopUsersOnDateQueryDto = {
    startDate: '2023-08-01',
    endDate: '2023-09-01',
  };

  const path = `/admin/users/top-users?startDate=${query.startDate}&endDate=${query.endDate}`;

  it('이달의 유저 불러오기 성공 e2e 테스트', async () => {
    const response = await requestE2E(app, path, 'get', 200, null, accessToken);

    response.body.forEach((item: any) => {
      validateOrReject(plainToClass(item, ResGetTopUsersOnDateDto));
    });
  }, 30000);
});
