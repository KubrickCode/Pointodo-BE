import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class ReqLogoutAppDto {
  @ApiProperty({ description: '유저 고유 ID(UUID)' })
  @IsString()
  id: string;
}

class ResLogoutAppDto {
  @ApiProperty({ example: '로그아웃 성공', description: '성공 메시지' })
  @IsString()
  readonly message: string;
}

export { ReqLogoutAppDto, ResLogoutAppDto };
