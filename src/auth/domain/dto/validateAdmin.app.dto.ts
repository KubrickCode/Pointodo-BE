import { ApiProperty } from '@nestjs/swagger';
import { USER_ID, USER_VALIDATION } from '@shared/constants/user.constant';
import { IsBoolean, IsString } from 'class-validator';

export class ReqValidateAdminAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly id: string;
}

export class ResValidateAdminAppDto {
  @ApiProperty({ description: USER_VALIDATION })
  @IsBoolean()
  readonly validation: boolean;
}
