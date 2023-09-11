import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { IBadgeService } from '@badge/domain/interfaces/badge.service.interface';
import { mockBadgeService } from './badgeService.mock';
import { ReqBuyBadgeAppDto } from '@badge/domain/dto/buyBadge.app.dto';

describe('buyBadge', () => {
  const badgeService: IBadgeService = mockBadgeService;

  it('유저 뱃지 구매 성공', async () => {
    const request: ReqBuyBadgeAppDto = {
      userId: TEST1_USER_LOCAL.id,
      badgeId: 2,
    };

    const result = await badgeService.buyBadge(request);

    expect(result).toBeUndefined();
  });
});
