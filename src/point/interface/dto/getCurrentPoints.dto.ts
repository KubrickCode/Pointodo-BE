import { ApiProperty } from '@nestjs/swagger';
import { CURRENT_POINTS } from '@shared/constants/point.constant';
import { IsInt } from 'class-validator';

export class ResGetCurrentPointsDto {
  @ApiProperty({ description: CURRENT_POINTS })
  @IsInt()
  readonly points: number;
}
