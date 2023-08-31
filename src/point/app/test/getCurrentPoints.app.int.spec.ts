import { Test, TestingModule } from '@nestjs/testing';
import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { PointService } from '../point.service';
import { pointServiceTestModuleOptions } from './pointService.test.option';
import {
  ReqGetCurrentPointsAppDto,
  ResGetCurrentPointsAppDto,
} from '@point/domain/dto/getCurrentPoints.app.dto';

describe('getCurrentPoints', () => {
  let pointService: PointService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule(
      pointServiceTestModuleOptions,
    ).compile();

    pointService = module.get<PointService>(PointService);

    await module.init();
  }, 30000);

  afterAll(async () => {
    await module.close();
  });

  it('유저 포인트 잔액 요청 성공', async () => {
    const request: ReqGetCurrentPointsAppDto = {
      userId: TEST1_USER_LOCAL.id,
    };

    const result = await pointService.getCurrentPoints(request);
    expect(result).toBeInstanceOf(ResGetCurrentPointsAppDto);
    expect(result.points).toEqual(0);
  }, 30000);
});
