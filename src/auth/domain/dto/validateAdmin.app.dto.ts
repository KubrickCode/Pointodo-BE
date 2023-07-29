import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class ReqValidateAdminAppDto {
  @ApiProperty({ description: '유저 고유 ID(UUID)' })
  @IsString()
  readonly id: string;
}

export class ResValidateAdminAppDto {
  @ApiProperty({ description: '인증 여부' })
  @IsBoolean()
  readonly validation: boolean;
}
