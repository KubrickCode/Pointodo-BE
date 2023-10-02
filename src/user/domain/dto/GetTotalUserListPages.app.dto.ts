import { ProviderType } from '../entities/User.entity';

export class ReqGetTotalUserListPagesAppDto {
  readonly provider: ProviderType | 'ALL';
  readonly limit: number;
}

export class ResGetTotalUserListPagesAppDto {
  readonly totalPages: number;
}
