import { BadgeType_ } from '@admin/badge/domain/entities/badge.entity';

const badgeTypes: BadgeType_[] = ['NORMAL', 'ACHIEVEMENT'];
const randomIndex = Math.floor(Math.random() * badgeTypes.length);

export const mockBadge = {
  id: 1,
  name: 'test',
  description: 'test',
  iconLink: 'test',
  type: badgeTypes[randomIndex],
  price: 1000,
};
