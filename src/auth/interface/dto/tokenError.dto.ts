import { ApiProperty } from '@nestjs/swagger';
import {
  AUTH_EXPIRED_TOKEN,
  AUTH_INVALID_TOKEN,
} from '@shared/messages/auth/auth.errors';
import { IsInt, IsString } from 'class-validator';

export class ResTokenUnauthorized {
  @ApiProperty({ example: 401, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number;

  @ApiProperty({
    example: `${AUTH_INVALID_TOKEN} | ${AUTH_EXPIRED_TOKEN}`,
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
