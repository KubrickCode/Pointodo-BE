import { UUID } from 'crypto';

export class ReqGetTotalPointPagesAppDto {
  readonly userId: UUID;
  readonly transactionType: 'EARNED' | 'SPENT';
}

export class ResGetTotalPointPagesAppDto {
  readonly totalPages: number;
}
