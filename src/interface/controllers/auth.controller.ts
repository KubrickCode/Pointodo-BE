import {
  Controller,
  Post,
  Req,
  UseGuards,
  Res,
  Get,
  Inject,
} from '@nestjs/common';
import { LocalAuthGuard } from '@infrastructure/auth/passport/guards/local.guard';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '@infrastructure/auth/passport/guards/jwt.guard';
import { GoogleAuthGuard } from '@infrastructure/auth/passport/guards/google.guard';
import { KakaoAuthGuard } from '@infrastructure/auth/passport/guards/kakao.guard';
import { globalConfig } from 'src/shared/config/global.config';
import { ConfigService } from '@nestjs/config';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReqLoginDto, ResLoginDto } from '../dto/auth/login.dto';
import { ResLogoutDto } from '../dto/auth/logout.dto';
import { ResRefreshDto } from '../dto/auth/refresh.dto';
import {
  RedirectSocialLoginDto,
  ResSocialLoginDto,
} from '../dto/auth/socialLogin.dto';
import { authDocs } from '../docs/auth/auth.docs';
import { getUserDocs } from 'src/interface/docs/user/getUser.docs';
import { IAuthService } from '@domain/auth/interfaces/auth.service.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation(authDocs.login)
  @ApiOkResponse({ type: ResLoginDto })
  @ApiBody({ type: ReqLoginDto })
  async login(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    const result: ResLoginDto = { accessToken };
    res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation(authDocs.logout)
  @ApiBearerAuth()
  @Post('logout')
  @ApiOkResponse({ type: ResLogoutDto })
  @ApiUnauthorizedResponse(getUserDocs.unauthorizedResponse)
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    const result: ResLogoutDto = await this.authService.logout(req.user);
    res.clearCookie('refreshToken');
    res.json(result);
  }

  @Get('refresh')
  @ApiOperation(authDocs.refresh)
  @ApiOkResponse({ type: ResRefreshDto })
  async refresh(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies['refreshToken'];
      const accessToken = await this.authService.refresh(refreshToken);
      const result: ResRefreshDto = { accessToken };
      res.json(result);
    } catch (error) {
      res.clearCookie('refreshToken');
      res.send();
    }
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  @ApiOperation(authDocs.google)
  @ApiOkResponse({ type: RedirectSocialLoginDto })
  async googleCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    res.cookie('accessToken', req.user.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.cookie('refreshToken', req.user.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.redirect(
      `${globalConfig(this.configService).clientOrigin}/social-login`,
    );
  }

  @UseGuards(KakaoAuthGuard)
  @Get('kakao/callback')
  @ApiOperation(authDocs.kakao)
  @ApiOkResponse({ type: RedirectSocialLoginDto })
  async kakaoCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    res.cookie('accessToken', req.user.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.cookie('refreshToken', req.user.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    const result: RedirectSocialLoginDto = {
      redirectUri: `${
        globalConfig(this.configService).clientOrigin
      }/social-login`,
    };
    res.redirect(result.redirectUri);
  }

  @Get('social-login')
  @ApiOperation(authDocs.socialLogin)
  @ApiOkResponse({ type: ResSocialLoginDto })
  async socialLogin(@Req() req: Request, @Res() res: Response): Promise<void> {
    res.clearCookie('accessToken');
    const result: ResSocialLoginDto = {
      accessToken: req.cookies['accessToken'],
    };
    res.json(result);
  }
}
