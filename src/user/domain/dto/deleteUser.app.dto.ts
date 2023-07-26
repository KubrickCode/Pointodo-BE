import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqDeleteUserAppDto {
  @ApiProperty({ description: '유저 고유 ID(UUID)' })
  @IsString()
  readonly id: string;
}

export class ResDeleteUserAppDto {
  @ApiProperty({ example: '회원 탈퇴 성공', description: '성공 메시지' })
  @IsString()
  readonly message: string;
}
