import { TransactionClient } from '@shared/types/Transaction.type';

export interface ITransactionService {
  runInTransaction<T>(
    callback: (tx: TransactionClient) => Promise<T>,
  ): Promise<T>;
}
