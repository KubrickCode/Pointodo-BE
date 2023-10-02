import { ApiProperty } from '@nestjs/swagger';
import { PointConstant } from '@shared/constants/Point.constant';
import { UserConstant } from '@shared/constants/User.constant';
import { IsString } from 'class-validator';
import { UUID } from 'crypto';

export class ReqGetTopUsersOnDateQueryDto {
  @ApiProperty({ description: '시작 날짜' })
  @IsString()
  readonly startDate: string;
  @ApiProperty({ description: '종료 날짜' })
  @IsString()
  readonly endDate: string;
}

export class ResGetTopUsersOnDateDto {
  @ApiProperty({ description: UserConstant.USER_ID })
  @IsString()
  readonly userId: UUID;

  @ApiProperty({ description: UserConstant.USER_EMAIL })
  @IsString()
  readonly email: string;

  @ApiProperty({ description: PointConstant.POINTS })
  @IsString()
  readonly points: number;
}
