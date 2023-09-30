import { ApiProperty } from '@nestjs/swagger';
import { PointConstant } from '@shared/constants/point.constant';
import { IsInt } from 'class-validator';

export class ResGetCurrentPointsDto {
  @ApiProperty({ description: PointConstant.CURRENT_POINTS })
  @IsInt()
  readonly points: number;
}
