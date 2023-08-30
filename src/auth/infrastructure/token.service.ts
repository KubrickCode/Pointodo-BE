import { ITokenService } from '@auth/domain/interfaces/token.service.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { jwtConfig } from '@shared/config/jwt.config';
import { DecodedAccessToken } from '@auth/domain/interfaces/decodedToken.interface';
import {
  ReqGenerateAccessTokenAppDto,
  ReqGenerateRefreshTokenAppDto,
} from '@auth/domain/dto/tokenService.app.dto';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateAccessToken(payload: ReqGenerateAccessTokenAppDto): string {
    const { id } = payload;
    const accessTokenExpiration = jwtConfig(
      this.configService,
    ).accessTokenExpiration;
    return this.jwtService.sign({ id }, { expiresIn: accessTokenExpiration });
  }

  generateRefreshToken(payload: ReqGenerateRefreshTokenAppDto): string {
    const { id } = payload;
    const refreshTokenExpiration = jwtConfig(
      this.configService,
    ).refreshTokenExpiration;
    return this.jwtService.sign({ id }, { expiresIn: refreshTokenExpiration });
  }

  decodeToken(token: string): DecodedAccessToken {
    return this.jwtService.decode(token) as DecodedAccessToken;
  }
}
