import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqChangeSelectedBadgeAppDto {
  @ApiProperty({ description: '유저 ID(UUID)' })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: '뱃지 유형' })
  @IsString()
  readonly badgeType: string;
}

export class ResChangeSelectedBadgeAppDto {
  @ApiProperty({
    example: '선택 뱃지 변경 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
