import { ApiProperty } from '@nestjs/swagger';
import { AuthErrorMessage } from '@shared/messages/auth/Auth.errors';
import { IsInt, IsString } from 'class-validator';

export class ResTokenUnauthorized {
  @ApiProperty({ example: 401, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number;

  @ApiProperty({
    example: `${AuthErrorMessage.AUTH_INVALID_TOKEN} | ${AuthErrorMessage.AUTH_EXPIRED_TOKEN}`,
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
