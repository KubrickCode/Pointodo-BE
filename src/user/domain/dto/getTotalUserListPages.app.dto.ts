import { ProviderType } from '../entities/user.entity';

export class ReqGetTotalUserListPagesAppDto {
  readonly provider: ProviderType | 'ALL';
  readonly limit: number;
}

export class ResGetTotalUserListPagesAppDto {
  readonly totalPages: number;
}
