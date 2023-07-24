import { UserEntity } from '@domain/user/entities/user.entity';
import { ITokenService } from '@domain/auth/interfaces/token.service.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { jwtConfig } from '@shared/config/jwt.config';
import { DecodedAccessToken } from '@domain/auth/interfaces/decodedToken.interface';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateAccessToken(user: UserEntity): string {
    const { id } = user;
    const accessTokenExpiration = jwtConfig(
      this.configService,
    ).accessTokenExpiration;
    return this.jwtService.sign({ id }, { expiresIn: accessTokenExpiration });
  }

  generateRefreshToken(user: UserEntity): string {
    const { id } = user;
    const refreshTokenExpiration = jwtConfig(
      this.configService,
    ).refreshTokenExpiration;
    return this.jwtService.sign({ id }, { expiresIn: refreshTokenExpiration });
  }

  decodeToken(token: string): DecodedAccessToken {
    return this.jwtService.decode(token) as DecodedAccessToken;
  }
}
