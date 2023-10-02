import { TEST1_USER_LOCAL } from '@shared/test/UserMockData';
import { IBadgeService } from '@badge/domain/interfaces/Badge.service.interface';
import { mockBadgeService } from './BadgeService.mock';
import {
  ReqGetUserBadgeListAppDto,
  ResGetUserBadgeListAppDto,
} from '@badge/domain/dto/GetUserBadgeList.app.dto';

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
