import { ApiProperty } from '@nestjs/swagger';
import { BadgeConstant } from '@shared/constants/badge.constant';
import { UserConstant } from '@shared/constants/user.constant';
import { IsInt, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ReqAdminGetUserBadgeListParamDto {
  @ApiProperty({ description: UserConstant.USER_ID })
  @IsUUID()
  readonly id: UUID;
}

export class ResAdminGetUserBadgeListDto {
  @ApiProperty({ description: BadgeConstant.BADGE_ID })
  @IsInt()
  readonly badgeId: number;

  @ApiProperty({ description: BadgeConstant.BADGE_NAME })
  @IsString()
  readonly name: string;
}
