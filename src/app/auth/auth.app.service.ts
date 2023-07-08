import { Injectable } from '@nestjs/common';
import { UserEntity } from '@domain/user/entities/user.entity';
import { AuthService } from '@domain/auth/auth.service';
import { IRedisService } from '@domain/redis/iredis.service';

@Injectable()
export class AuthAppService {
  constructor(
    private readonly authService: AuthService,
    private readonly redisService: IRedisService,
  ) {}

  generateAccessToken(user: UserEntity): string {
    return this.authService.generateAccessToken(user);
  }

  async login(
    user: UserEntity,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = this.authService.generateAccessToken(user);
    const refreshToken = this.authService.generateRefreshToken(user);
    await this.redisService.set(refreshToken, user.id, 60 * 60 * 24 * 7);
    return { accessToken, refreshToken };
  }
}
