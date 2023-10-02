import { Test, TestingModule } from '@nestjs/testing';
import { TEST1_USER_LOCAL } from '@shared/test/UserMockData';
import { BadgeService } from '../Badge.service';
import { badgeServiceTestModuleOptions } from './BadgeService.test.option';
import { ReqBuyBadgeAppDto } from '@badge/domain/dto/BuyBadge.app.dto';
import { BadgeErrorMessage } from '@shared/messages/badge/Badge.errors';
import { HttpStatus } from '@nestjs/common';

describe('buyBadge', () => {
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

  const request: ReqBuyBadgeAppDto = {
    userId: TEST1_USER_LOCAL.id,
    badgeId: 42,
  };

  it('뱃지 구매 성공', async () => {
    const result = await badgeService.buyBadge(request);
    expect(result).toBeUndefined();
    await badgeService.deleteUserBadge(request);
  }, 30000);

  it('뱃지 구매 실패 - 포인트 부족', async () => {
    try {
      await badgeService.buyBadge({ ...request, badgeId: 2 });
    } catch (error) {
      expect(error.response.statusCode).toEqual(HttpStatus.CONFLICT);
      expect(error.response.message).toEqual(
        BadgeErrorMessage.BUY_BADGE_CONFLICT_POINTS,
      );
      expect(error.response.error).toEqual('Conflict');
    }
  }, 30000);
});
