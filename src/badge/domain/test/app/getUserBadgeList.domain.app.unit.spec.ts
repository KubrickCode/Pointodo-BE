import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { IBadgeService } from '@badge/domain/interfaces/badge.service.interface';
import { mockBadgeService } from './badgeService.mock';
import {
  ReqGetUserBadgeListAppDto,
  ResGetUserBadgeListAppDto,
} from '@badge/domain/dto/getUserBadgeList.app.dto';

describe('getUserBadgeList', () => {
  const badgeService: IBadgeService = mockBadgeService;

  it('유저 뱃지 리스트 반환 성공', async () => {
    const request: ReqGetUserBadgeListAppDto = { userId: TEST1_USER_LOCAL.id };

    const userBadgeList: ResGetUserBadgeListAppDto[] = [{ badgeId: 1 }];

    jest
      .spyOn(badgeService, 'getUserBadgeList')
      .mockResolvedValue(userBadgeList);

    const result = await badgeService.getUserBadgeList(request);

    expect(result).toEqual(userBadgeList);
    expect(badgeService.getUserBadgeList).toHaveBeenCalledWith(request);
  });
});
