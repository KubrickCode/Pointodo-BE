import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { UserAppService } from '../../app/user/user.app.service';
import { ReqRegisterDto, ResRegisterDto } from '../dto/user/register.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '@infrastructure/auth/passport/guards/jwt.guard';
import { ResGetUserDto } from '../dto/user/getUser.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { registerDocs } from '../docs/user/register.docs';
import { getUserDocs } from '../docs/user/getUser.docs';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userAppService: UserAppService) {}

  @Post('register')
  @ApiOperation(registerDocs.operation)
  @ApiOkResponse(registerDocs.okResponse)
  @ApiBadRequestResponse(registerDocs.badRequest)
  async createUser(@Body() user: ReqRegisterDto): Promise<ResRegisterDto> {
    return this.userAppService.registerUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation(getUserDocs.operation)
  @ApiBearerAuth()
  @ApiOkResponse(getUserDocs.okResponse)
  @ApiUnauthorizedResponse(getUserDocs.unauthorizedResponse)
  async getUser(@Req() req: Request): Promise<ResGetUserDto> {
    return req.user;
  }
}
