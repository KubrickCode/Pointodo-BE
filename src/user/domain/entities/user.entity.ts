import { User, Provider, Role } from '@prisma/client';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { UUID } from 'crypto';

export class UserEntity implements User {
  @Expose() readonly id: UUID;
  @Expose() readonly email: string;
  @Expose() readonly provider: ProviderType;
  @Expose() readonly role: RoleType;
  @Expose() readonly selectedBadgeId: number;
  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  readonly createdAt: Date;
  @Expose() readonly selectedBadge: { iconLink: string };

  @Exclude() readonly password?: string;
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
