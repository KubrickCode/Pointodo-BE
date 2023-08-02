import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  createUser(user: Partial<UserEntity>): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  changePassword(id: string, newPassword: string): Promise<UserEntity>;
  deleteUser(id: string): Promise<UserEntity>;
  changeSelectedBadge(userId: string, badgeType: string): Promise<UserEntity>;
}
