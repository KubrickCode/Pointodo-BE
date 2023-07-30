import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqBuyBadgeDto {
  @ApiProperty({ description: '뱃지 유형' })
  @IsString()
  readonly badgeType: string;
}

export class ResBuyBadgeDto {
  @ApiProperty({
    example: '뱃지 구매 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
