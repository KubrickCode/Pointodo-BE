import { IBadgeAdminService } from '../../interfaces/badge.admin.service.interface';
import { mockBadgeAdminService } from './badgeAdminService.mock';
import { mockBadge } from '@shared/test/badgeMockData';
import { ReqAdminUpdateBadgeAppDto } from '../../dto/updateBadge.admin.app.dto';

describe('updateBadge', () => {
  const badgeAdminService: IBadgeAdminService = mockBadgeAdminService;

  it('뱃지 업데이트 성공', async () => {
    const badge = { ...mockBadge };
    delete badge.id;
    delete badge.type;
    const request: ReqAdminUpdateBadgeAppDto = badge;

    jest.spyOn(badgeAdminService, 'updateBadge').mockResolvedValue();

    const result = await badgeAdminService.updateBadge(request);

    expect(result).toEqual(undefined);
    expect(badgeAdminService.updateBadge).toHaveBeenCalledWith(request);
  });
});
