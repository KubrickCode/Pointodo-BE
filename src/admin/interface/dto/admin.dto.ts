import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ResForbiddenAdmin {
  @ApiProperty({ example: 403, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number;

  @ApiProperty({
    example: '관리자 권한이 없습니다',
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string;

  @ApiProperty({
    example: '/api/admin/example',
    description: '요청 경로',
  })
  @IsString()
  readonly path: string;
}
