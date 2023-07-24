import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

class ReqValidateAdminAppDto {
  @ApiProperty({ description: '유저 고유 ID(UUID)' })
  @IsString()
  readonly id: string;
}

class ResValidateAdminAppDto {
  @ApiProperty({ description: '인증 여부' })
  @IsBoolean()
  readonly validation: boolean;
}

export { ReqValidateAdminAppDto, ResValidateAdminAppDto };
