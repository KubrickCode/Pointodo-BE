import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  Inject,
  Patch,
  Delete,
} from '@nestjs/common';
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
import { IUserService } from '@domain/user/interfaces/user.service.interface';
import { ReqChangePasswordDto } from '../dto/user/changePassword.dto';
import { changePasswordDocs } from '../docs/user/changePassword.docs';
import { deleteUserDocs } from '../docs/user/deleteUser.docs';
import { globalDocs } from '@interface/docs/global/global.docs';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  @Post('register')
  @ApiOperation(registerDocs.operation)
  @ApiOkResponse(registerDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  async register(@Body() user: ReqRegisterDto): Promise<ResRegisterDto> {
    return this.userService.register(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation(getUserDocs.operation)
  @ApiBearerAuth()
  @ApiOkResponse(getUserDocs.okResponse)
  @ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
  async getUser(@Req() req: Request): Promise<ResGetUserDto> {
    return this.userService.getUser({ id: req.user.id });
  }

  @Patch('password')
  @UseGuards(JwtAuthGuard)
  @ApiOperation(changePasswordDocs.operation)
  @ApiBearerAuth()
  @ApiOkResponse(changePasswordDocs.okResponse)
  @ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  async changePassword(
    @Req() req: Request,
    @Body() body: ReqChangePasswordDto,
  ) {
    return this.userService.changePassword({
      id: req.user.id,
      password: body.password,
    });
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiOperation(deleteUserDocs.operation)
  @ApiBearerAuth()
  @ApiOkResponse(deleteUserDocs.okResponse)
  @ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
  async deleteUser(@Req() req: Request) {
    return this.userService.deleteUser({ id: req.user.id });
  }
}
