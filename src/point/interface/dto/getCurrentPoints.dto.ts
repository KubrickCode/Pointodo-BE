import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ResGetCurrentPointsDto {
  @ApiProperty({ description: '유저 보유 포인트' })
  @IsInt()
  readonly points: number;
}
