import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class ResDeleteBadgeTypeDto {
  @ApiProperty({
    example: '뱃지 타입 삭제 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}

export { ResDeleteBadgeTypeDto };
