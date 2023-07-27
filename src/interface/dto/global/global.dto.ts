import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class ResInvalidation {
  @ApiProperty({ example: 400, description: '에러 상태 코드' })
  @IsString()
  readonly statusCode: number;

  @ApiProperty({
    example: '유효성 검사 실패 케이스',
    description: '에러 메시지 배열',
  })
  @IsString()
  readonly message: string[];

  @ApiProperty({ example: '/api/example', description: '요청 경로' })
  @IsString()
  readonly path: string;
}

export { ResInvalidation };
