import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

class ResTokenUnauthorized {
  @ApiProperty({ example: 401, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number;

  @ApiProperty({
    example: '만료된 토큰입니다 | 유효하지 않은 토큰입니다',
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string;

  @ApiProperty({
    example: '/api/example',
    description: '요청 경로',
  })
  @IsString()
  readonly path: string;
}

export { ResTokenUnauthorized };
