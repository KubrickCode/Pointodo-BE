export class ReqGetTotalPointPagesAppDto {
  readonly userId: string;
  readonly transactionType: string;
}

export class ResGetTotalPointPagesAppDto {
  readonly totalPages: number;
}
