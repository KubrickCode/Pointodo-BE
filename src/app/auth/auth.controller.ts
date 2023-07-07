import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthAppService } from './auth.app.service';
import { LocalAuthGuard } from '@infrastructure/auth/passport/guards/local.guard';
import { UserEntity } from '@domain/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authAppService: AuthAppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<{ accessToken: string }> {
    const user = req.user as UserEntity;
    const accessToken = this.authAppService.generateAccessToken(user);
    return { accessToken };
  }
}
