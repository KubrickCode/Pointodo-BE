import { User, Provider, Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: string;
  email: string;

  @Exclude()
  password: string | null;

  provider: ProviderType;
  role: RoleType;
  selectedBadge: number;
  createdAt: Date;
}

type ReadonlyRecord<K extends string, V> = Readonly<Record<K, V>>;

export type ProviderType = Provider;
export const ProviderTypes: ReadonlyRecord<ProviderType, ProviderType> = {
  LOCAL: 'LOCAL',
  GOOGLE: 'GOOGLE',
  KAKAO: 'KAKAO',
};

export type RoleType = Role;
export const RoleTypes: ReadonlyRecord<RoleType, RoleType> = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  MASTER: 'MASTER',
};
