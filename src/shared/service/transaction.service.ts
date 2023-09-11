import { TransactionClient } from '@shared/types/transaction.type';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { ITransactionService } from '@shared/interfaces/ITransaction.service.interface';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async runInTransaction<T>(
    callback: (tx: TransactionClient) => Promise<T>,
  ): Promise<T> {
    return this.prisma.$transaction(async (tx) => {
      return callback(tx);
    });
  }
}
