import { Injectable } from '@nestjs/common';
import { UserEntity } from '@domain/user/entities/user.entity';
import { ITokenService } from '@domain/auth/interfaces/itoken.service';

@Injectable()
export class AuthAppService {
  constructor(private readonly tokenService: ITokenService) {}

  generateAccessToken(user: UserEntity): string {
    return this.tokenService.generateAccessToken(user);
  }
}
