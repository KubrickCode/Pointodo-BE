import { Injectable } from '@nestjs/common';
import { UserEntity } from '@domain/user/entities/user.entity';
import { AuthService } from '@domain/auth/auth.service';

@Injectable()
export class AuthAppService {
  constructor(private readonly authService: AuthService) {}

  generateAccessToken(user: UserEntity): string {
    return this.authService.generateAccessToken(user);
  }
}
