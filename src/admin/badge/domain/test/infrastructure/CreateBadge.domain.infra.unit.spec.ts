import { IBadgeAdminRepository } from '../../interfaces/Badge.admin.repository.interface';
import { mockBadgeAdminRepository } from './BadgeAdminRepository.mock';
import { BadgeEntity } from '../../entities/Badge.entity';
import { mockBadge } from '@shared/test/BadgeMockData';

describe('createBadge', () => {
  const badgeAdminRepository: IBadgeAdminRepository = mockBadgeAdminRepository;

  it('뱃지 생성 성공 - NORMAL,ACHIEVEMENT', async () => {
    const expectedResult: BadgeEntity = {
      ...mockBadge,
    };

    jest
      .spyOn(badgeAdminRepository, 'createBadge')
      .mockResolvedValue(expectedResult);

    const result = await badgeAdminRepository.createBadge(
      mockBadge.name,
      mockBadge.description,
      mockBadge.iconLink,
      mockBadge.type,
      mockBadge.price,
    );

    expect(result).toEqual(expectedResult);
    expect(badgeAdminRepository.createBadge).toHaveBeenCalledWith(
      mockBadge.name,
      mockBadge.description,
      mockBadge.iconLink,
      mockBadge.type,
      mockBadge.price,
    );
  });

  it('뱃지 생성 성공 - SPECIAL', async () => {
    const expectedResult: BadgeEntity = {
      ...mockBadge,
    };

    jest
      .spyOn(badgeAdminRepository, 'createBadge')
      .mockResolvedValue(expectedResult);

    const result = await badgeAdminRepository.createBadge(
      mockBadge.name,
      mockBadge.description,
      mockBadge.iconLink,
      mockBadge.type,
    );

    expect(result).toEqual(expectedResult);
    expect(badgeAdminRepository.createBadge).toHaveBeenCalledWith(
      mockBadge.name,
      mockBadge.description,
      mockBadge.iconLink,
      mockBadge.type,
    );
  });
});
