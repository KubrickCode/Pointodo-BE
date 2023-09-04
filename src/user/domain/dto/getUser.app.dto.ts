import { UUID } from 'crypto';
import { UserEntity } from '../entities/user.entity';
import { Exclude, Expose } from 'class-transformer';

export class ReqGetUserAppDto {
  @Expose() readonly id: UUID;
}

export class ResGetUserAppDto extends UserEntity {
  @Expose() readonly iconLink: string;

  @Exclude() readonly id: UUID;
  @Exclude() readonly selectedBadge: { iconLink: string };
}
