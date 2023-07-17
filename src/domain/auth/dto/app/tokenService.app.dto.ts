import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class ReqGenerateAccessTokenAppDto {
  @ApiProperty({ description: '유저 고유 ID(UUID)' })
  @IsString()
  id: string;
}

class ReqGenerateRefreshTokenAppDto {
  @ApiProperty({ description: '유저 고유 ID(UUID)' })
  @IsString()
  id: string;
}

export { ReqGenerateAccessTokenAppDto, ReqGenerateRefreshTokenAppDto };
