import {
  Controller,
  Post,
  Req,
  UseGuards,
  Res,
  Get,
  Inject,
  Body,
  HttpCode,
} from '@nestjs/common';
import { LocalAuthGuard } from '@auth/infrastructure/passport/guards/local.guard';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import { GoogleAuthGuard } from '@auth/infrastructure/passport/guards/google.guard';
import { KakaoAuthGuard } from '@auth/infrastructure/passport/guards/kakao.guard';
import { globalConfig } from '@shared/config/global.config';
import { ConfigService } from '@nestjs/config';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReqLoginDto } from './dto/login.dto';
import { ResLogoutDto } from './dto/logout.dto';
import { RedirectSocialLoginDto } from './dto/socialLogin.dto';
import { IAuthService } from '@auth/domain/interfaces/auth.service.interface';
import { ReqCheckPasswordDto } from './dto/checkPassword.dto';
import { checkPasswordDocs } from './docs/checkPassword.docs';
import { ResChangePasswordDto } from '@user/interface/dto/changePassword.dto';
import { globalDocs } from '@shared/docs/global.docs';
import { loginDocs } from '@auth/interface/docs/login.docs';
import { logoutDocs } from './docs/logout.docs';
import { refreshDocs } from './docs/refresh.docs';
import { socialLoginDocs } from './docs/socialLogin.docs';
import { validateLoggedInDocs } from './docs/validateLoggedIn.docs';
import { HandleDateTime } from '@shared/utils/handleDateTime';
import { jwtExpiration } from '@shared/config/jwt.config';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('status')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation(validateLoggedInDocs.operation)
  @ApiOkResponse(validateLoggedInDocs.okResponse)
  @ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
  async validateLoggedIn() {
    return true;
  }

  @Post('login')
  @HttpCode(201)
  @UseGuards(LocalAuthGuard)
  @ApiOperation(loginDocs.operation)
  @ApiCreatedResponse(loginDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  @ApiNotFoundResponse(loginDocs.invalidEmail)
  @ApiUnauthorizedResponse(loginDocs.invalidPassword)
  @ApiBody({ type: ReqLoginDto })
  async login(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { accessToken, refreshToken } = await this.authService.login({
      id: req.user.id,
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(
        HandleDateTime.getFewHoursLater(
          jwtExpiration.accessTokenExpirationHours,
        ),
      ),
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(
        HandleDateTime.getFewDaysLater(
          jwtExpiration.refreshTokenExpirationDays,
        ),
      ),
    });
    res.send();
  }

  @Post('logout')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation(logoutDocs.operation)
  @ApiOkResponse(logoutDocs.okResponse)
  @ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    const result: ResLogoutDto = await this.authService.logout(req.user);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json(result);
  }

  @Get('refresh')
  @HttpCode(201)
  @ApiCookieAuth('refreshToken')
  @ApiOperation(refreshDocs.operation)
  @ApiCreatedResponse(refreshDocs.okResponse)
  async refresh(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const { refreshToken } = req.cookies;
      const { accessToken } = await this.authService.refresh({ refreshToken });
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(
          HandleDateTime.getFewHoursLater(
            jwtExpiration.accessTokenExpirationHours,
          ),
        ),
      });
      res.json(true);
    } catch (error) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      res.json(false);
    }
  }

  @Post('check-password')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation(checkPasswordDocs.operation)
  @ApiOkResponse(checkPasswordDocs.okResponse)
  @ApiUnauthorizedResponse(checkPasswordDocs.invalidCheckPassword)
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
  @HttpCode(201)
  @UseGuards(GoogleAuthGuard)
  @ApiOperation(socialLoginDocs.google.operation)
  @ApiCreatedResponse(socialLoginDocs.google.okResponse)
  async googleCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    res.cookie('accessToken', req.user.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(
        HandleDateTime.getFewHoursLater(
          jwtExpiration.accessTokenExpirationHours,
        ),
      ),
    });
    res.cookie('refreshToken', req.user.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(
        HandleDateTime.getFewDaysLater(
          jwtExpiration.refreshTokenExpirationDays,
        ),
      ),
    });
    const result: RedirectSocialLoginDto = {
      redirectUri: `${globalConfig(this.configService).clientOrigin}`,
    };
    res.redirect(result.redirectUri);
  }

  @Get('kakao/callback')
  @HttpCode(201)
  @UseGuards(KakaoAuthGuard)
  @ApiOperation(socialLoginDocs.kakao.operation)
  @ApiCreatedResponse(socialLoginDocs.kakao.okResponse)
  async kakaoCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    res.cookie('accessToken', req.user.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(
        HandleDateTime.getFewHoursLater(
          jwtExpiration.accessTokenExpirationHours,
        ),
      ),
    });
    res.cookie('refreshToken', req.user.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(
        HandleDateTime.getFewDaysLater(
          jwtExpiration.refreshTokenExpirationDays,
        ),
      ),
    });
    const result: RedirectSocialLoginDto = {
      redirectUri: `${globalConfig(this.configService).clientOrigin}`,
    };
    res.redirect(result.redirectUri);
  }
}
