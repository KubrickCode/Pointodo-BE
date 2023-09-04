import { ApiProperty } from '@nestjs/swagger';
import { POINTS } from '@shared/constants/point.constant';
import { USER_EMAIL, USER_ID } from '@shared/constants/user.constant';
import { IsString } from 'class-validator';
import { UUID } from 'crypto';

export class ReqGetTopUsersOnDateDto {
  @ApiProperty({ description: '시작 날짜' })
  @IsString()
  readonly startDate: string;
  @ApiProperty({ description: '종료 날짜' })
  @IsString()
  readonly endDate: string;
}

export class ResGetTopUsersOnDateDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly userId: UUID;

  @ApiProperty({ description: USER_EMAIL })
  @IsString()
  readonly email: string;

  @ApiProperty({ description: POINTS })
  @IsString()
  readonly points: number;
}
