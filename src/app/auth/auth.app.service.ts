import { Injectable } from '@nestjs/common';
import { UserEntity } from '@domain/user/entities/user.entity';
import { AuthService } from '@domain/auth/auth.service';
import { RedisService } from '@domain/redis/redis.service';

@Injectable()
export class AuthAppService {
  constructor(
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
  ) {}

  async login(
    user: UserEntity,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = this.authService.generateAccessToken(user);
    const refreshToken = this.authService.generateRefreshToken(user);
    await this.redisService.set(
      `refresh_token:${user.id}`,
      refreshToken,
      60 * 60 * 24 * 7,
    );
    return { accessToken, refreshToken };
  }

  async logout(user: UserEntity) {
    await this.redisService.delete(`refresh_token:${user.id}`);
  }
}
