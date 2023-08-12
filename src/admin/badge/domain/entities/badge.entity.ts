import { Badge, BadgeType } from '@prisma/client';

export class BadgeEntity implements Badge {
  id: number;
  name: string;
  description: string;
  iconLink: string;
  price: number | null;
  type: BadgeType_;
}

type ReadonlyRecord<K extends string, V> = Readonly<Record<K, V>>;

export type BadgeType_ = BadgeType;
export const BadgeTypes: ReadonlyRecord<BadgeType_, BadgeType_> = {
  NORMAL: 'NORMAL',
  ACHIEVEMENT: 'ACHIEVEMENT',
  SPECIAL: 'SPECIAL',
};
