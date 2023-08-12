import { ProviderType } from '../entities/user.entity';

export class ReqGetTotalUserListPagesAppDto {
  readonly provider: ProviderType | 'ALL';
}

export class ResGetTotalUserListPagesAppDto {
  readonly totalPages: number;
}
