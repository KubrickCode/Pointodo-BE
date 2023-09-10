import { TransactionClient } from '@shared/types/transaction.type';

export interface ITransactionService {
  runInTransaction<T>(
    callback: (tx: TransactionClient) => Promise<T>,
  ): Promise<T>;
}
