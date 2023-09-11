import { UUID } from 'crypto';
import { POINT_LOG_TRANSACTION_TYPE } from '../entities/pointsLog.entity';

export class ReqGetTotalPointPagesAppDto {
  readonly userId: UUID;
  readonly transactionType: POINT_LOG_TRANSACTION_TYPE;
  readonly limit: number;
}

export class ResGetTotalPointPagesAppDto {
  readonly totalPages: number;
}
