import { IUserRepository } from './user/interfaces/iuser.repository';
import { UserEntity } from './user/entities/user.entity';
import { IPasswordHasher } from './user/interfaces/ipasswordHasher.repository';

export class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async createUser(email: string, password: string): Promise<UserEntity> {
    const hashedPassword = await this.passwordHasher.hashPassword(password);

    const user = new UserEntity();
    user.email = email;
    user.password = hashedPassword;

    return this.userRepository.createUser(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }
}
