import { IsString } from 'class-validator';

class DomainResLoginDto {
  @IsString()
  readonly accessToken: string;

  @IsString()
  readonly refreshToken: string;
}

export { DomainResLoginDto };
