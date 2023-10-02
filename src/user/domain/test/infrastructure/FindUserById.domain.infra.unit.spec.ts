import { UserEntity } from '@user/domain/entities/User.entity';
import { IUserRepository } from '@user/domain/interfaces/User.repository.interface';
import { mockUserRepository } from './UserRepository.mock';
import { MOCK_USER } from '@shared/test/UserMockData';

describe('findUser', () => {
  const userRepository: IUserRepository = mockUserRepository;

  it('유저 찾기 성공 by ID', async () => {
    const user: UserEntity = MOCK_USER;

    jest.spyOn(userRepository, 'findById').mockResolvedValue(user);

    const result = await userRepository.findById(MOCK_USER.id);

    expect(result).toEqual(user);
    expect(userRepository.findById).toHaveBeenCalledWith(MOCK_USER.id);
  });
});
