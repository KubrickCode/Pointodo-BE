import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqChangeSelectedBadgeDto {
  @ApiProperty({ description: '뱃지 유형' })
  @IsString()
  readonly badgeType: string;
}

export class ResChangeSelectedBadgeDto {
  @ApiProperty({
    example: '선택 뱃지 변경 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}