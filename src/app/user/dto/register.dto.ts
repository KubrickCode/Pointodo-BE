import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

class ReqRegisterDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/)
  readonly password: string;
}

class ResRegisterDto {
  @ApiProperty()
  @IsString()
  readonly message: string;
}

export { ReqRegisterDto, ResRegisterDto };
