import { Test, TestingModule } from '@nestjs/testing';
import { TEST1_USER_LOCAL } from '@shared/test/UserMockData';
import { BadgeService } from '../Badge.service';
import {
  ReqGetUserBadgeListAppDto,
  ResGetUserBadgeListAppDto,
} from '@badge/domain/dto/GetUserBadgeList.app.dto';
import { badgeServiceTestModuleOptions } from './BadgeService.test.option';

describe('getUserBadgeList', () => {
  let badgeService: BadgeService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule(
      badgeServiceTestModuleOptions,
    ).compile();

    badgeService = module.get<BadgeService>(BadgeService);

    await module.init();
  }, 30000);

  afterAll(async () => {
    await module.close();
  });

  it('유저 뱃지 리스트 요청 성공', async () => {
    const request: ReqGetUserBadgeListAppDto = {
      userId: TEST1_USER_LOCAL.id,
    };

    const result = await badgeService.getUserBadgeList(request);

    expect(result[0]).toBeInstanceOf(ResGetUserBadgeListAppDto);
    expect(result[0]).toEqual({ badgeId: 1 });
  }, 30000);
});
