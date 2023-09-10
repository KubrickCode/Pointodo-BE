import { UUID } from 'crypto';

export interface IUserBadgeTransactionRepository {
  buyBadge(userId: UUID, badgeId: number): Promise<number>;
}
