import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  createUser(user: Partial<UserEntity>): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
