import { ApiProperty } from '@nestjs/swagger';
import { BADGE_ID } from '@shared/constants/badge.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { Type } from 'class-transformer';
import { IsInt, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ReqAdminDeleteUserBadgeQueryDto {
  @ApiProperty({ description: USER_ID })
  @IsUUID()
  readonly userId: UUID;

  @ApiProperty({ description: BADGE_ID })
  @Type(() => Number)
  @IsInt()
  readonly badgeId: number;
}
