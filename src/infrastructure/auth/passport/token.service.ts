import { UserEntity } from '@domain/user/entities/user.entity';
import { ITokenService } from '@domain/user/interfaces/itoken.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(user: UserEntity): string {
    const { id, email, role } = user;
    const payload = { id, email, role };
    return this.jwtService.sign(payload);
  }
}
