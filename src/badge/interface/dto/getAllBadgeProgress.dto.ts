import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ResGetAllBadgeProgressDto {
  @ApiProperty({ description: '뱃지 유형' })
  @IsString()
  readonly badgeType: string;

  @ApiProperty({ description: '뱃지 획득 진척도' })
  @IsInt()
  readonly progress: number;
}
