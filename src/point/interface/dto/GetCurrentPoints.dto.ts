import { ApiProperty } from '@nestjs/swagger';
import { PointConstant } from '@shared/constants/Point.constant';
import { IsInt } from 'class-validator';

export class ResGetCurrentPointsDto {
  @ApiProperty({ description: PointConstant.CURRENT_POINTS })
  @IsInt()
  readonly points: number;
}
