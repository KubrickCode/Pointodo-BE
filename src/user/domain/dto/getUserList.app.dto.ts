import { UUID } from 'crypto';
import {
  ProviderType,
  RoleType,
  USER_ORDER_TYPE,
} from '../entities/user.entity';

export class ReqGetUserListAppDto {
  readonly order: USER_ORDER_TYPE;
  readonly offset: number;
  readonly limit: number;
  readonly provider: ProviderType | 'ALL';
}

export class ResGetUserListAppDto {
  readonly id: UUID;
  readonly email: string;
  readonly provider: ProviderType;
  readonly role: RoleType;
  readonly selectedBadgeId: number;
  readonly createdAt: Date;
}
