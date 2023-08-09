import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  createUser(
    email: string,
    password?: string,
    provider?: string,
  ): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  findPasswordById(email: string): Promise<string>;
  changePassword(id: string, newPassword: string): Promise<void>;
  deleteUser(id: string): Promise<UserEntity>;
  changeSelectedBadge(userId: string, badgeId: number): Promise<UserEntity>;
}
