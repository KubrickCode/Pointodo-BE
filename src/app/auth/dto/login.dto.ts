import { IsEmail, IsString, Matches } from 'class-validator';

class ReqLoginDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/)
  readonly password: string;
}

class ResLoginDto {
  @IsString()
  readonly accessToken: string;
}

export { ReqLoginDto, ResLoginDto };
