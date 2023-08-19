import { IUserRepository } from '@user/domain/interfaces/user.repository.interface';
import { mockUserRepository } from './userRepository.mock';
import { UserEntity } from '@user/domain/entities/user.entity';
import { plainToClass } from 'class-transformer';

describe('Craete User', () => {
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = mockUserRepository;
  });

  it('로컬 유저 추가', async () => {
    const email = 'test@test.test';
    const password = 'test1234!@';

    const userEntity = {
      id: '',
      email,
      provider: 'LOCAL',
      role: 'USER',
      selectedBadgeId: 1,
      createdAt: new Date(),
    };

    const response = plainToClass(UserEntity, userEntity);

    jest.spyOn(userRepository, 'createUser').mockResolvedValue(response);

    const result = await userRepository.createUser(email, password);

    expect(result).toEqual(response);
    expect(userRepository.createUser).toHaveBeenCalledWith(email, password);
  });
});
