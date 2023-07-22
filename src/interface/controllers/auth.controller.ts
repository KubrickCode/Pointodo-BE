import {
  Controller,
  Post,
  Req,
  UseGuards,
  Res,
  Get,
  Inject,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from '@infrastructure/auth/passport/guards/local.guard';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '@infrastructure/auth/passport/guards/jwt.guard';
import { GoogleAuthGuard } from '@infrastructure/auth/passport/guards/google.guard';
import { KakaoAuthGuard } from '@infrastructure/auth/passport/guards/kakao.guard';
import { globalConfig } from 'src/shared/config/global.config';
import { ConfigService } from '@nestjs/config';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
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
import { IAuthService } from '@domain/auth/interfaces/auth.service.interface';
import { ReqCheckPasswordDto } from '../dto/auth/checkPassword.dto';
import { checkPasswordDocs } from '../docs/auth/checkPassword.docs';
import { ResChangePasswordDto } from '../dto/user/changePassword.dto';
import { globalDocs } from '@interface/docs/global/global.docs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation(authDocs.login)
  @ApiOkResponse({ type: ResLoginDto })
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  @ApiBody({ type: ReqLoginDto })
  async login(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { accessToken, refreshToken } = await this.authService.login({
      id: req.user.id,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    const result: ResLoginDto = { accessToken };
    res.json(result);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation(authDocs.logout)
  @ApiOkResponse({ type: ResLogoutDto })
  @ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    const result: ResLogoutDto = await this.authService.logout(req.user);
    res.clearCookie('refreshToken');
    res.json(result);
  }

  @Get('refresh')
  @ApiCookieAuth('refreshToken')
  @ApiOperation(authDocs.refresh)
  @ApiOkResponse({ type: ResRefreshDto })
  async refresh(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies['refreshToken'];
      const accessToken = await this.authService.refresh({ refreshToken });
      const result: ResRefreshDto = accessToken;
      res.json(result);
    } catch (error) {
      res.clearCookie('refreshToken');
      res.send();
    }
  }

  @Post('check-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation(checkPasswordDocs.operation)
  @ApiOkResponse(checkPasswordDocs.okResponse)
  @ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  async checkPassword(
    @Req() req: Request,
    @Body() body: ReqCheckPasswordDto,
  ): Promise<ResChangePasswordDto> {
    return await this.authService.checkPassword({
      id: req.user.id,
      password: body.password,
    });
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
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

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
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
    const result: ResSocialLoginDto = {
      accessToken: req.cookies['accessToken'],
    };
    res.clearCookie('accessToken');
    res.json(result);
  }
}
