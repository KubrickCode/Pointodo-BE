// src/domain/user/UserService.ts

import { IUserRepository } from './user/interfaces/iuser.repository';
import { User } from './user/entities/user.entity';

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(email: string, password: string): Promise<User> {
    let user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new Error('이미 존재하는 계정입니다');
    }

    user = User.createNew(email, password);

    return this.userRepository.createUser(user);
  }
}
