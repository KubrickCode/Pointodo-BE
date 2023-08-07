import { ApiProperty } from '@nestjs/swagger';
import { BADGE_TYPE_NAME } from '@shared/constants/badge.constant';
import { IsString } from 'class-validator';

export class ResGetUserBadgeListDto {
  @ApiProperty({ description: BADGE_TYPE_NAME })
  @IsString()
  readonly badgeType: string;
}
