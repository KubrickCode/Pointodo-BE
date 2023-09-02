import { BadgeType_ } from '../../entities/badge.entity';
import { IBadgeAdminService } from '../../interfaces/badge.admin.service.interface';
import { mockBadgeAdminService } from './badgeAdminService.mock';
import {
  ReqAdminCreateBadgeAppDto,
  ResAdminCreateBadgeAppDto,
} from '../../dto/createBadge.admin.app.dto';
import { mockBadge } from '@shared/test/badgeMockData';

describe('createBadge', () => {
  const badgeAdminService: IBadgeAdminService = mockBadgeAdminService;

  it('뱃지 생성 성공 - NORMAL,ACHIEVEMENT', async () => {
    const request: ReqAdminCreateBadgeAppDto = mockBadge;

    const expectedResult: ResAdminCreateBadgeAppDto = {
      id: 1,
    };

    jest
      .spyOn(badgeAdminService, 'createBadge')
      .mockResolvedValue(expectedResult);

    const result = await badgeAdminService.createBadge(request);

    expect(result).toEqual(expectedResult);
    expect(badgeAdminService.createBadge).toHaveBeenCalledWith(request);
  });

  it('뱃지 생성 성공 - SPECIAL', async () => {
    const requestBadge = { ...mockBadge, type: 'SPECIAL' as BadgeType_ };
    delete requestBadge.price;

    const request: ReqAdminCreateBadgeAppDto = requestBadge;

    const expectedResult: ResAdminCreateBadgeAppDto = {
      id: 1,
    };

    jest
      .spyOn(badgeAdminService, 'createBadge')
      .mockResolvedValue(expectedResult);

    const result = await badgeAdminService.createBadge(request);

    expect(result).toEqual(expectedResult);
    expect(badgeAdminService.createBadge).toHaveBeenCalledWith(request);
  });
});
