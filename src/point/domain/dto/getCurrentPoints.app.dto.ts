import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ReqGetCurrentPointsAppDto {
  @ApiProperty({ description: '유저 ID(UUID)' })
  @IsString()
  readonly userId: string;
}

export class ResGetCurrentPointsAppDto {
  @ApiProperty({ description: '유저 보유 포인트' })
  @IsInt()
  readonly points: number;
}
