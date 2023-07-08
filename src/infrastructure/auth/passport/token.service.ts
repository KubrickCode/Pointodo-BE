import { UserEntity } from '@domain/user/entities/user.entity';
import { ITokenService } from '@domain/auth/interfaces/itoken.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { jwtConfig } from 'config/jwt.config';
import { DecodedToken } from '@domain/auth/interfaces/decodedToken';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateAccessToken(user: UserEntity): string {
    const { id, email, role } = user;
    const accessTokenExpiration = jwtConfig(
      this.configService,
    ).accessTokenExpiration;
    const payload = { id, email, role };
    return this.jwtService.sign(payload, { expiresIn: accessTokenExpiration });
  }

  generateRefreshToken(user: UserEntity): string {
    const { id, email } = user;
    const refreshTokenExpiration = jwtConfig(
      this.configService,
    ).refreshTokenExpiration;
    const payload = { id, email };
    return this.jwtService.sign(payload, { expiresIn: refreshTokenExpiration });
  }

  decodeToken(token: string): DecodedToken {
    return this.jwtService.decode(token) as DecodedToken;
  }
}
