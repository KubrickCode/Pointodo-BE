import { PrismaClient } from '@prisma/client';
import * as runtime from '@prisma/client/runtime/library';

export type TransactionClient = Omit<PrismaClient, runtime.ITXClientDenyList>;
