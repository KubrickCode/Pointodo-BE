import { UUID } from 'crypto';
import {
  ProviderType,
  TopOfUserOnDate,
  UserEntity,
} from '../entities/user.entity';

export interface IUserRepository {
  createUser(
    email: string,
    password?: string,
    provider?: ProviderType,
  ): Promise<UserEntity>;

  findByEmail(email: string): Promise<UserEntity | null>;

  findById(id: UUID): Promise<UserEntity | null>;

  findPasswordById(email: string): Promise<string>;

  changePassword(id: UUID, newPassword: string): Promise<void>;

  deleteUser(id: UUID): Promise<UserEntity>;

  changeSelectedBadge(userId: UUID, badgeId: number): Promise<UserEntity>;

  changeSelectedBadgeToDefault(badgeId: number): Promise<void>;

  getUserList(
    order: string,
    limit: number,
    offset: number,
    provider: ProviderType | 'ALL',
  ): Promise<UserEntity[]>;

  getTotalUserListPages(provider: ProviderType | 'ALL'): Promise<number>;

  getTopUsersOnDate(
    startDate: string,
    endDate: string,
  ): Promise<TopOfUserOnDate[]>;
}
