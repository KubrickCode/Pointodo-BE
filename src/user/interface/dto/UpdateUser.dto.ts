import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { AuthMessage } from '@shared/messages/auth/Auth.messages';
import { UserConstant } from '@shared/constants/User.constant';

export class ReqUpdateUserDto {
  @ApiProperty({
    example: UserConstant.USER_PWD_EXAMPLE,
    description: UserConstant.USER_PWD,
  })
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/, {
    message: AuthMessage.VALIDATE_PASSWORD,
  })
  readonly password: string;
}
