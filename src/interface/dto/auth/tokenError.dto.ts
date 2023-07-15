import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

class ResTokenUnauthorized {
  @ApiProperty({ example: 401, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number;

  @ApiProperty({ example: 'Unauthorized', description: '에러 메시지' })
  @IsString()
  readonly message: string;
}

export { ResTokenUnauthorized };
