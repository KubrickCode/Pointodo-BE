import { TransactionClient } from '@shared/types/transaction.type';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async startTransaction(): Promise<TransactionClient> {
    return await this.prisma.$transaction(async (tx: TransactionClient) => {
      return tx;
    });
  }
}
