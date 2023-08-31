import { BadgeType_ } from '../../entities/badge.entity';
import { IBadgeAdminService } from '../../interfaces/badge.admin.service.interface';
import { mockBadgeAdminService } from './badgeAdminService.mock';
import {
  ReqAdminCreateBadgeAppDto,
  ResAdminCreateBadgeAppDto,
} from '../../dto/createBadge.admin.app.dto';
import { CREATE_BADGE_SUCCESS_MESSAGE } from '@shared/messages/admin/badge.admin.messages';

describe('createBadge', () => {
  const badgeAdminService: IBadgeAdminService = mockBadgeAdminService;

  it('뱃지 생성 성공 - NORMAL,ACHIEVEMENT', async () => {
    const badgeTypes: BadgeType_[] = ['NORMAL', 'ACHIEVEMENT'];
    const randomIndex = Math.floor(Math.random() * badgeTypes.length);

    const name = 'test';
    const description = 'test';
    const iconLink = 'test';
    const type: BadgeType_ = badgeTypes[randomIndex];
    const price = 100;

    const request: ReqAdminCreateBadgeAppDto = {
      name,
      description,
      iconLink,
      type,
      price,
    };

    const expectedResult: ResAdminCreateBadgeAppDto = {
      message: CREATE_BADGE_SUCCESS_MESSAGE,
    };

    jest
      .spyOn(badgeAdminService, 'createBadge')
      .mockResolvedValue(expectedResult);

    const result = await badgeAdminService.createBadge(request);

    expect(result).toEqual(expectedResult);
    expect(badgeAdminService.createBadge).toHaveBeenCalledWith(request);
  });

  it('뱃지 생성 성공 - SPECIAL', async () => {
    const name = 'test';
    const description = 'test';
    const iconLink = 'test';
    const type: BadgeType_ = 'SPECIAL';

    const request: ReqAdminCreateBadgeAppDto = {
      name,
      description,
      iconLink,
      type,
    };

    const expectedResult: ResAdminCreateBadgeAppDto = {
      message: CREATE_BADGE_SUCCESS_MESSAGE,
    };

    jest
      .spyOn(badgeAdminService, 'createBadge')
      .mockResolvedValue(expectedResult);

    const result = await badgeAdminService.createBadge(request);

    expect(result).toEqual(expectedResult);
    expect(badgeAdminService.createBadge).toHaveBeenCalledWith(request);
  });
});
