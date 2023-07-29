import { ITransaction } from '@shared/interfaces/transaction.interface';
import { PrismaService } from './prisma.service';

export class PrismaTransaction implements ITransaction {
  constructor(private readonly prisma: PrismaService) {}

  async beginTransaction(isolationLevel?: string) {
    await this.prisma.$queryRawUnsafe('BEGIN');
    if (isolationLevel) {
      await this.prisma.$queryRawUnsafe(
        `SET TRANSACTION ISOLATION LEVEL ${isolationLevel}`,
      );
    }
  }

  async commitTransaction() {
    await this.prisma.$queryRawUnsafe('COMMIT');
  }

  async rollbackTransaction() {
    await this.prisma.$queryRawUnsafe('ROLLBACK');
  }
}
