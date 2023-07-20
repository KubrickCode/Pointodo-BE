import { BadgeTypes } from '@prisma/client';

export class BadgeTypesEntity implements BadgeTypes {
  id: number;
  name: string;
  description: string;
  icon: string;
}
