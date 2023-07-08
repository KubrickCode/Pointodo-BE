import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { DecodedToken } from '@domain/auth/interfaces/decodedToken';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { jwtConfig } from 'config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies.accessToken;
        }
        return token;
      },
      ignoreExpiration: false,
      secretOrKey: jwtConfig(configService).accessTokenSecret,
    });
  }

  async validate(payload: DecodedToken) {
    const { id, email, provider, role, defaultBadgeId, createdAt } = payload;
    return { id, email, provider, role, defaultBadgeId, createdAt };
  }
}
