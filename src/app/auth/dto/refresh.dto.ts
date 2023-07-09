import { IsString } from 'class-validator';

class ResRefreshDto {
  @IsString()
  readonly accessToken: string;
}

export { ResRefreshDto };
