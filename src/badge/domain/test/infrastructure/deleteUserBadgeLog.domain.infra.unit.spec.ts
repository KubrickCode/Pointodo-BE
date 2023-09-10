import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { IUserBadgeRepository } from '@badge/domain/interfaces/userBadge.repository.interface';
import { mockUserBadgeRepository } from './userBadgeRepository.mock';
import { UserBadgeLogEntity } from '@badge/domain/entities/userBadgeLog.entity';

describe('deleteUserBadgeLog', () => {
  const userBadgeRepository: IUserBadgeRepository = mockUserBadgeRepository;

  it('유저 뱃지 로그 삭제 성공', async () => {
    const badgeLogId = 1;
    const userId = TEST1_USER_LOCAL.id;
    const badgeId = 2;

    const expectedResult: UserBadgeLogEntity = {
      id: badgeLogId,
      userId,
      badgeId,
      earnedAt: new Date(),
    };

    jest
      .spyOn(userBadgeRepository, 'deleteUserBadgeLog')
      .mockResolvedValue(expectedResult);

    const result = await userBadgeRepository.deleteUserBadgeLog(badgeLogId);

    expect(result).toEqual(expectedResult);
    expect(userBadgeRepository.deleteUserBadgeLog).toHaveBeenCalledWith(
      badgeLogId,
    );
  });
});
