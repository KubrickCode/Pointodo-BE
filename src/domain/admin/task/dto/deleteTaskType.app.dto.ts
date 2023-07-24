import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class ResDeleteTaskTypeAppDto {
  @ApiProperty({
    example: '작업 타입 삭제 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}

export { ResDeleteTaskTypeAppDto };
