import { Badge, BadgeType } from '@prisma/client';
import { Expose } from 'class-transformer';

export class BadgeEntity implements Badge {
  @Expose() readonly id: number;
  @Expose() readonly name: string;
  @Expose() readonly description: string;
  @Expose() readonly iconLink: string;
  @Expose() readonly price: number | null;
  @Expose() readonly type: BadgeType_;
}

type ReadonlyRecord<K extends string, V> = Readonly<Record<K, V>>;

export type BadgeType_ = BadgeType;
export const BadgeTypes: ReadonlyRecord<BadgeType_, BadgeType_> = {
  NORMAL: 'NORMAL',
  ACHIEVEMENT: 'ACHIEVEMENT',
  SPECIAL: 'SPECIAL',
};
