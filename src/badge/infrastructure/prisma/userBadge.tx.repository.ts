import { IUserBadgeTransactionRepository } from '@badge/domain/interfaces/userBadge.tx.repository.interface';
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '@shared/service/prisma.service';
import { UUID } from 'crypto';
import * as runtime from '@prisma/client/runtime/library';

@Injectable()
export class UserBadgeTransactionRepository
  implements IUserBadgeTransactionRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async buyBadge(userId: UUID, badgeId: number): Promise<number> {
    return await this.prisma.$transaction(
      async (tx: Omit<PrismaClient, runtime.ITXClientDenyList>) => {
        const { price } = await tx.badge.findFirst({
          where: { id: badgeId },
          select: { price: true },
        });

        const badgeLog = await tx.userBadgesLogs.create({
          data: { userId, badgeId },
        });

        await tx.spentPointsLogs.create({
          data: { badgeLogId: badgeLog.id, userId, points: price },
        });

        return badgeLog.id;
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead,
      },
    );
  }
}
