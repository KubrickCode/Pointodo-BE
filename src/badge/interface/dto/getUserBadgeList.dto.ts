import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResGetUserBadgeListDto {
  @ApiProperty({ description: '뱃지 유형' })
  @IsString()
  readonly badgeType: string;
}
