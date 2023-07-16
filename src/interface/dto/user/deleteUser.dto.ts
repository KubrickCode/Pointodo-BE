import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class ResDeleteUserDto {
  @ApiProperty({ example: '회원 탈퇴 성공', description: '성공 메시지' })
  @IsString()
  readonly message: string;
}

export { ResDeleteUserDto };
