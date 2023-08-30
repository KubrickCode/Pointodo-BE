import { UserEntity } from '@user/domain/entities/user.entity';
import { IUserRepository } from '@user/domain/interfaces/user.repository.interface';
import { mockUserRepository } from './userRepository.mock';

describe('findUser', () => {
  const userRepository: IUserRepository = mockUserRepository;

  it('유저 찾기 성공 by ID', async () => {
    const id = 'uuid-uuid-uuid-uuid-uuid';

    const user: UserEntity = {
      id,
      email: 'test@test.test',
      provider: 'LOCAL',
      role: 'USER',
      selectedBadgeId: 1,
      createdAt: new Date(),
    };

    jest.spyOn(userRepository, 'findById').mockResolvedValue(user);

    const result = await userRepository.findById(id);

    expect(result).toEqual(user);
    expect(userRepository.findById).toHaveBeenCalledWith(id);
  });
});
