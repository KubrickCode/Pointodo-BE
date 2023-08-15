export class ReqGetTotalPointPagesAppDto {
  readonly userId: string;
  readonly transactionType: 'EARNED' | 'SPENT';
}

export class ResGetTotalPointPagesAppDto {
  readonly totalPages: number;
}
