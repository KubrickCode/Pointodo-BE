import { BadgeTypes } from '@prisma/client';

export class BadgeTypesEntity implements BadgeTypes {
  id: number;
  newId?: number;
  name: string;
  description: string;
  iconLink: string;
}
