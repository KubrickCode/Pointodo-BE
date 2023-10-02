import { UUID } from 'crypto';
import { BadgeProgressEntity } from '../entities/BadgeProgress.entity';
import { Exclude } from 'class-transformer';

export class ReqGetAllBadgeProgressAppDto {
  readonly userId: UUID;
}

export class ResGetAllBadgeProgressAppDto extends BadgeProgressEntity {
  @Exclude() readonly id: number;
  @Exclude() readonly userId: UUID;
  @Exclude() readonly occurredAt: Date;
}
