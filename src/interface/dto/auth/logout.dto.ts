import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class ResLogoutDto {
  @ApiProperty({ example: '로그아웃 성공', description: '성공 메시지' })
  @IsString()
  readonly message: string;
}

export { ResLogoutDto };
