import { PointTransactionTypes } from '@prisma/client';

export class PointTransactionTypesEntity implements PointTransactionTypes {
  id: number;
  newId?: number;
  name: string;
}
