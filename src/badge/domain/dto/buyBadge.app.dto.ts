import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ReqBuyBadgeAppDto {
  @ApiProperty({ description: '유저 ID(UUID)' })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: '뱃지 유형' })
  @IsInt()
  readonly badgeType: string;
}

export class ResBuyBadgeAppDto {
  @ApiProperty({
    example: '뱃지 구매 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
