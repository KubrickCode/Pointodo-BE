import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqGetUserBadgeListAppDto {
  @ApiProperty({ description: '유저 ID(UUID)' })
  @IsString()
  readonly userId: string;
}

export class ResGetUserBadgeListAppDto {
  @ApiProperty({ description: '뱃지 유형' })
  @IsString()
  readonly badgeType: string;
}
