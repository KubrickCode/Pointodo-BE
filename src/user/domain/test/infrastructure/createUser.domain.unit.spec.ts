import { UserEntity } from '@user/domain/entities/user.entity';
import { IUserRepository } from '@user/domain/interfaces/user.repository.interface';
import { mockUserRepository } from './userRepository.mock';

describe('createUser', () => {
  const userRepository: IUserRepository = mockUserRepository;

  it('로컬 유저 생성 성공', async () => {
    const email = 'test@test.test';
    const password = 'test1234!@';

    const createdUser: UserEntity = {
      id: 'test1234',
      email,
      provider: 'LOCAL',
      role: 'USER',
      selectedBadgeId: 1,
      createdAt: new Date(),
    };

    jest.spyOn(userRepository, 'createUser').mockResolvedValue(createdUser);

    const result = await userRepository.createUser(email, password);

    expect(result).toEqual(createdUser);
    expect(userRepository.createUser).toHaveBeenCalledWith(email, password);
  });
});
