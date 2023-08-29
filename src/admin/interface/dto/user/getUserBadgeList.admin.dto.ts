import { ApiProperty } from '@nestjs/swagger';
import { BADGE_ID, BADGE_NAME } from '@shared/constants/badge.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { IsInt, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ReqAdminGetUserBadgeListParamDto {
  @ApiProperty({ description: USER_ID })
  @IsUUID()
  readonly id: UUID;
}

export class ResAdminGetUserBadgeListDto {
  @ApiProperty({ description: BADGE_ID })
  @IsInt()
  readonly badgeId: number;

  @ApiProperty({ description: BADGE_NAME })
  @IsString()
  readonly name: string;
}
