import { UserEntity } from '@domain/user/entities/user.entity';
import { IUserRepository } from '@domain/user/interfaces/user.repository.interface';

describe('createUser', () => {
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = {
      createUser: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      changePassword: jest.fn(),
      deleteUser: jest.fn(),
    };
  });

  it('로컬 유저 생성 성공', async () => {
    const user = {
      email: 'test@test.test',
      password: 'test1234!@',
    };

    const createdUser: UserEntity = {
      id: 'test1234',
      email: user.email,
      password: 'hashedPassword',
      defaultBadgeId: 0,
      provider: 'Local',
      role: 'User',
      createdAt: new Date(),
    };

    jest.spyOn(userRepository, 'createUser').mockResolvedValue(createdUser);

    const result = await userRepository.createUser(user);

    expect(result).toEqual(createdUser);
    expect(userRepository.createUser).toHaveBeenCalledWith(user);
  });
});
