import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class ResLogoutDto {
  @ApiProperty()
  @IsString()
  readonly message: string;
}

export { ResLogoutDto };
