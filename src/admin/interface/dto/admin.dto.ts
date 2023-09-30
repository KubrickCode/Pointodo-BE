import { ApiProperty } from '@nestjs/swagger';
import { AuthErrorMessage } from '@shared/messages/auth/auth.errors';
import { IsInt, IsString } from 'class-validator';

export class ResForbiddenAdmin {
  @ApiProperty({ example: 403, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number;

  @ApiProperty({
    example: AuthErrorMessage.AUTH_INVALID_ADMIN,
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
