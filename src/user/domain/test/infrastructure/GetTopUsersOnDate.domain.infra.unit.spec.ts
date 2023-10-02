import { IUserRepository } from '@user/domain/interfaces/User.repository.interface';
import { mockUserRepository } from './UserRepository.mock';
import { TEST1_USER_LOCAL } from '@shared/test/UserMockData';

describe('getTopUsersOnDate', () => {
  const userRepository: IUserRepository = mockUserRepository;

  it('이달의 유저 찾기 성공', async () => {
    const users = [
      {
        userId: TEST1_USER_LOCAL.id,
        email: TEST1_USER_LOCAL.email,
        points: 0,
      },
    ];

    jest.spyOn(userRepository, 'getTopUsersOnDate').mockResolvedValue([
      {
        userId: TEST1_USER_LOCAL.id,
        email: TEST1_USER_LOCAL.email,
        points: 0,
      },
    ]);

    const result = await userRepository.getTopUsersOnDate(
      '2023-08-01',
      '2023-09-01',
    );

    expect(result).toEqual(users);
    expect(userRepository.getTopUsersOnDate).toHaveBeenCalledWith(
      '2023-08-01',
      '2023-09-01',
    );
  });
});
