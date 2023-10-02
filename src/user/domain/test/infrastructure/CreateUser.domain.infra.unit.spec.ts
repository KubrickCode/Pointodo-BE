import { UserEntity } from '@user/domain/entities/User.entity';
import { IUserRepository } from '@user/domain/interfaces/User.repository.interface';
import { mockUserRepository } from './UserRepository.mock';
import { MOCK_USER, TEST_PASSWORD } from '@shared/test/UserMockData';

describe('createUser', () => {
  const userRepository: IUserRepository = mockUserRepository;

  it('로컬 유저 생성 성공', async () => {
    const email = MOCK_USER.email;
    const password = TEST_PASSWORD;

    const createdUser: UserEntity = MOCK_USER;

    jest.spyOn(userRepository, 'createUser').mockResolvedValue(createdUser);

    const result = await userRepository.createUser(email, password);

    expect(result).toEqual(createdUser);
    expect(userRepository.createUser).toHaveBeenCalledWith(email, password);
  });
});
