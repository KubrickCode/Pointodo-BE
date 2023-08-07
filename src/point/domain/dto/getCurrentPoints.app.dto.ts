import { ApiProperty } from '@nestjs/swagger';
import { CURRENT_POINTS } from '@shared/constants/point.constant';
import { USER_ID } from '@shared/constants/user.constant';
import { IsInt, IsString } from 'class-validator';

export class ReqGetCurrentPointsAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly userId: string;
}

export class ResGetCurrentPointsAppDto {
  @ApiProperty({ description: CURRENT_POINTS })
  @IsInt()
  readonly points: number;
}
