import { UserEntity } from '@domain/user/entities/user.entity';
import { ITokenService } from '@domain/auth/interfaces/token.service.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { jwtConfig } from 'src/shared/config/jwt.config';
import { DecodedAccessToken } from '@domain/auth/interfaces/decodedToken.interface';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateAccessToken(user: UserEntity): string {
    const { id, email, role, provider, defaultBadgeId, createdAt } = user;
    const accessTokenExpiration = jwtConfig(
      this.configService,
    ).accessTokenExpiration;
    const payload = { id, email, role, provider, defaultBadgeId, createdAt };
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

  decodeToken(token: string): DecodedAccessToken {
    return this.jwtService.decode(token) as DecodedAccessToken;
  }
}
