import { ProviderType, UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  createUser(
    email: string,
    password?: string,
    provider?: ProviderType,
  ): Promise<UserEntity>;

  findByEmail(email: string): Promise<UserEntity | null>;

  findById(id: string): Promise<UserEntity | null>;

  findPasswordById(email: string): Promise<string>;

  changePassword(id: string, newPassword: string): Promise<void>;

  deleteUser(id: string): Promise<UserEntity>;

  changeSelectedBadge(userId: string, badgeId: number): Promise<UserEntity>;

  changeSelectedBadgetoDefault(badgeId: number): Promise<void>;

  getUserList(
    order: string,
    limit: number,
    offset: number,
    provider: ProviderType | 'ALL',
  ): Promise<UserEntity[]>;

  getTotalUserListPages(provider: ProviderType | 'ALL'): Promise<number>;
}
