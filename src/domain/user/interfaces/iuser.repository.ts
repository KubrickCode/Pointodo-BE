import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  createUser(user: UserEntity): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
