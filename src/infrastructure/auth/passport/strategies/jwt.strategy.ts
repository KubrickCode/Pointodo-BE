import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { DecodedToken } from '@domain/auth/interfaces/decodedToken';
import { ConfigService } from '@nestjs/config';
import { jwtConfig } from 'config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig(configService).accessTokenSecret,
    });
  }

  async validate(payload: DecodedToken): Promise<DecodedToken> {
    const { id, email, provider, role, defaultBadgeId, createdAt } = payload;
    return { id, email, provider, role, defaultBadgeId, createdAt };
  }
}
