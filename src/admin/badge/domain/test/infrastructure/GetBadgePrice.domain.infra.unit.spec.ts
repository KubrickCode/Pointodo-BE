import { IBadgeAdminRepository } from '../../interfaces/Badge.admin.repository.interface';
import { mockBadgeAdminRepository } from './BadgeAdminRepository.mock';
import { mockBadge } from '@shared/test/BadgeMockData';

describe('getBadgePrice', () => {
  const badgeAdminRepository: IBadgeAdminRepository = mockBadgeAdminRepository;

  it('뱃지 가격 불러오기 성공', async () => {
    const expectedResult = mockBadge.price;

    jest
      .spyOn(badgeAdminRepository, 'getBadgePrice')
      .mockResolvedValue(expectedResult);

    const result = await badgeAdminRepository.getBadgePrice(mockBadge.id);

    expect(result).toEqual(expectedResult);
    expect(badgeAdminRepository.getBadgePrice).toHaveBeenCalledWith(
      mockBadge.id,
    );
  });
});
