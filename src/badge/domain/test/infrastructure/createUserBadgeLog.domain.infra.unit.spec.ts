import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { IUserBadgeRepository } from '@badge/domain/interfaces/userBadge.repository.interface';
import { mockUserBadgeRepository } from './userBadgeRepository.mock';
import { UserBadgeLogEntity } from '@badge/domain/entities/userBadgeLog.entity';

describe('createUserBadgeLog', () => {
  const userBadgeRepository: IUserBadgeRepository = mockUserBadgeRepository;

  it('유저 뱃지 로그 생성 성공', async () => {
    const userId = TEST1_USER_LOCAL.id;
    const badgeId = 2;

    const expectedResult: UserBadgeLogEntity = {
      id: 1,
      userId,
      badgeId,
      earnedAt: new Date(),
    };

    jest
      .spyOn(userBadgeRepository, 'createUserBadgeLog')
      .mockResolvedValue(expectedResult);

    const result = await userBadgeRepository.createUserBadgeLog(
      userId,
      badgeId,
    );

    expect(result).toEqual(expectedResult);
    expect(userBadgeRepository.createUserBadgeLog).toHaveBeenCalledWith(
      userId,
      badgeId,
    );
  });
});
