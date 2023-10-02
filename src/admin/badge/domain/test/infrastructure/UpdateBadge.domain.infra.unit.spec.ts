import { IBadgeAdminRepository } from '../../interfaces/Badge.admin.repository.interface';
import { mockBadgeAdminRepository } from './BadgeAdminRepository.mock';
import { BadgeEntity } from '../../entities/Badge.entity';
import { mockBadge } from '@shared/test/BadgeMockData';

describe('updateBadge', () => {
  const badgeAdminRepository: IBadgeAdminRepository = mockBadgeAdminRepository;

  it('뱃지 업데이트 성공', async () => {
    const expectedResult: BadgeEntity = {
      ...mockBadge,
    };

    jest
      .spyOn(badgeAdminRepository, 'updateBadge')
      .mockResolvedValue(expectedResult);

    const result = await badgeAdminRepository.updateBadge(
      mockBadge.id,
      mockBadge.name,
      mockBadge.description,
      mockBadge.iconLink,
      mockBadge.price,
    );

    expect(result).toEqual(expectedResult);
    expect(badgeAdminRepository.updateBadge).toHaveBeenCalledWith(
      mockBadge.id,
      mockBadge.name,
      mockBadge.description,
      mockBadge.iconLink,
      mockBadge.price,
    );
  });
});
