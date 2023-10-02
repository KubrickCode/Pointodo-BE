import { IBadgeAdminService } from '../../interfaces/Badge.admin.service.interface';
import { mockBadgeAdminService } from './BadgeAdminService.mock';
import { mockBadge } from '@shared/test/BadgeMockData';
import { ReqAdminUpdateBadgeAppDto } from '../../dto/UpdateBadge.admin.app.dto';

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
