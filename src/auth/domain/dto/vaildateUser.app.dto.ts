import { ApiProperty } from '@nestjs/swagger';
import { Provider, Role } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsString,
  Matches,
} from 'class-validator';
import {
  VALIDATE_EMAIL,
  VALIDATE_PASSWORD,
} from '@shared/messages/auth/auth.messages';
import {
  USER_EMAIL,
  USER_EMAIL_EXAMPLE,
  USER_ID,
  USER_PROVIDER,
  USER_PROVIDER_EXAMPLE,
  USER_PWD,
  USER_PWD_EXAMPLE,
  USER_REGISTER_DATE,
  USER_ROLE,
  USER_ROLE_EXAMPLE,
  USER_SELECTED_BADGE,
} from '@shared/constants/user.constant';

export class ReqValidateUserAppDto {
  @ApiProperty({ example: USER_EMAIL_EXAMPLE, description: USER_EMAIL })
  @IsEmail({}, { message: VALIDATE_EMAIL })
  readonly email: string;

  @ApiProperty({
    example: USER_PWD_EXAMPLE,
    description: USER_PWD,
  })
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/, {
    message: VALIDATE_PASSWORD,
  })
  readonly password: string;
}

export class ResValidateUserAppDto {
  @ApiProperty({ description: USER_ID })
  @IsString()
  readonly id: string;

  @ApiProperty({ example: USER_EMAIL_EXAMPLE, description: USER_EMAIL })
  @IsEmail({}, { message: VALIDATE_EMAIL })
  readonly email: string;

  @ApiProperty({ example: USER_PROVIDER_EXAMPLE, description: USER_PROVIDER })
  @IsEnum(Provider)
  readonly provider: Provider;

  @ApiProperty({ example: USER_ROLE_EXAMPLE, description: USER_ROLE })
  @IsEnum(Role)
  readonly role: Role;

  @ApiProperty({ description: USER_SELECTED_BADGE })
  @IsInt()
  readonly selectedBadge: number;

  @IsDate()
  @ApiProperty({ description: USER_REGISTER_DATE })
  readonly createdAt: Date;
}
