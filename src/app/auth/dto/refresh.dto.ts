import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class ResRefreshDto {
  @ApiProperty()
  @IsString()
  readonly accessToken: string;
}

export { ResRefreshDto };
