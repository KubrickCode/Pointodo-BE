import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { DecodedAccessToken } from '@auth/domain/interfaces/decodedToken.interface';
import { ConfigService } from '@nestjs/config';
import { jwtConfig } from '@shared/config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConfig(configService).accessTokenSecret,
    });
  }

  async validate(payload: DecodedAccessToken): Promise<DecodedAccessToken> {
    return { id: payload.id };
  }
}
