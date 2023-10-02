import { ApiProperty } from '@nestjs/swagger';
import { BadgeConstant } from '@shared/constants/Badge.constant';
import { UserConstant } from '@shared/constants/User.constant';
import { Type } from 'class-transformer';
import { IsInt, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ReqAdminDeleteUserBadgeQueryDto {
  @ApiProperty({ description: UserConstant.USER_ID })
  @IsUUID()
  readonly userId: UUID;

  @ApiProperty({ description: BadgeConstant.BADGE_ID })
  @Type(() => Number)
  @IsInt()
  readonly badgeId: number;
}
