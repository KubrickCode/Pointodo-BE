import { IsString } from 'class-validator';

class ResLogoutDto {
  @IsString()
  readonly message: string;
}

export { ResLogoutDto };
