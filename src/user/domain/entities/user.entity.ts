import { User, Provider, Role } from '@prisma/client';
import { UUID } from 'crypto';

export class UserEntity implements User {
  id: UUID;
  email: string;
  provider: ProviderType;
  role: RoleType;
  selectedBadgeId: number;
  createdAt: Date;
}

type ReadonlyRecord<K extends string, V> = Readonly<Record<K, V>>;

export type ProviderType = Provider;
export const ProviderTypes: ReadonlyRecord<ProviderType, ProviderType> = {
  LOCAL: 'LOCAL',
  GOOGLE: 'GOOGLE',
  KAKAO: 'KAKAO',
};

export const ProviderTypesWithAll: ReadonlyRecord<
  ProviderType | 'ALL',
  ProviderType | 'ALL'
> = {
  LOCAL: 'LOCAL',
  GOOGLE: 'GOOGLE',
  KAKAO: 'KAKAO',
  ALL: 'ALL',
};

export type RoleType = Role;
export const RoleTypes: ReadonlyRecord<RoleType, RoleType> = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  MASTER: 'MASTER',
};
