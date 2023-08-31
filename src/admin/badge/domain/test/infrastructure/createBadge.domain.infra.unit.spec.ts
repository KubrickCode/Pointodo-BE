import { IBadgeAdminRepository } from '../../interfaces/badge.admin.repository.interface';
import { mockBadgeAdminRepository } from './badgeAdminRepository.mock';
import { BadgeEntity, BadgeType_ } from '../../entities/badge.entity';

describe('createBadge', () => {
  const badgeAdminRepository: IBadgeAdminRepository = mockBadgeAdminRepository;

  it('뱃지 생성 성공 - NORMAL,ACHIEVEMENT', async () => {
    const badgeTypes: BadgeType_[] = ['NORMAL', 'ACHIEVEMENT'];
    const randomIndex = Math.floor(Math.random() * badgeTypes.length);

    const name = 'test';
    const description = 'test';
    const iconLink = 'test';
    const type: BadgeType_ = badgeTypes[randomIndex];
    const price = 100;

    const expectedResult: BadgeEntity = {
      id: 1,
      name,
      description,
      iconLink,
      type,
      price,
    };

    jest
      .spyOn(badgeAdminRepository, 'createBadge')
      .mockResolvedValue(expectedResult);

    const result = await badgeAdminRepository.createBadge(
      name,
      description,
      iconLink,
      type,
      price,
    );

    expect(result).toEqual(expectedResult);
    expect(badgeAdminRepository.createBadge).toHaveBeenCalledWith(
      name,
      description,
      iconLink,
      type,
      price,
    );
  });

  it('뱃지 생성 성공 - SPECIAL', async () => {
    const name = 'test';
    const description = 'test';
    const iconLink = 'test';
    const type: BadgeType_ = 'SPECIAL';
    const price = null;

    const expectedResult: BadgeEntity = {
      id: 1,
      name,
      description,
      iconLink,
      type,
      price,
    };

    jest
      .spyOn(badgeAdminRepository, 'createBadge')
      .mockResolvedValue(expectedResult);

    const result = await badgeAdminRepository.createBadge(
      name,
      description,
      iconLink,
      type,
    );

    expect(result).toEqual(expectedResult);
    expect(badgeAdminRepository.createBadge).toHaveBeenCalledWith(
      name,
      description,
      iconLink,
      type,
    );
  });
});
