import { AdminAuthGuard } from '@auth/infrastructure/passport/guards/admin.guard';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { adminDocs } from './docs/admin.docs';
import { globalDocs } from '@shared/docs/global.docs';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ReqGetUserListQueryDto,
  ResGetUserListDto,
} from './dto/user/getUserList.dto';
import { IUserService } from '@user/domain/interfaces/user.service.interface';
import {
  ReqGetTotalUserListPagesParamDto,
  ResGetTotalUserListPagesDto,
} from './dto/user/getTotalUserListPages.dto';
import { ResGetUserBadgeListDto } from '@badge/interface/dto/getUserBadgeList.dto';
import { ReqGetUserBadgeListParamDto } from './dto/user/getUserBadgeList.dto';
import { IBadgeService } from '@badge/domain/interfaces/badge.service.interface';
import {
  ReqPutBadgeToUserDto,
  ResPutBadgeToUserDto,
} from './dto/user/putBadgeToUser.dto';
import {
  ReqDeleteUserBadgeQueryDto,
  ResDeleteUserBadgeDto,
} from './dto/user/deleteUserBadge.dto';

@ApiTags('Admin - User')
@ApiBearerAuth()
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
@ApiForbiddenResponse(adminDocs.forbidden)
@Controller('/admin/user')
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class UserAdminController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
    @Inject('IBadgeService')
    private readonly badgeService: IBadgeService,
  ) {}

  @Get('/list')
  @HttpCode(200)
  async getUserList(
    @Query() query: ReqGetUserListQueryDto,
  ): Promise<ResGetUserListDto[]> {
    const { page, order, provider } = query;
    return await this.userService.getUserList({ order, page, provider });
  }

  @Get('/count/:provider')
  @HttpCode(200)
  async getTotalUserListPages(
    @Param() param: ReqGetTotalUserListPagesParamDto,
  ): Promise<ResGetTotalUserListPagesDto> {
    const { provider } = param;
    return await this.userService.getTotalUserListPages({ provider });
  }

  @Get('/badge/list/:id')
  @HttpCode(200)
  async getUserBadgeList(
    @Param() param: ReqGetUserBadgeListParamDto,
  ): Promise<ResGetUserBadgeListDto[]> {
    const { id } = param;
    return await this.badgeService.getUserBadgeListWithName({ userId: id });
  }

  @Put('/badge/put')
  @HttpCode(201)
  async putBadgeToUser(
    @Body() body: ReqPutBadgeToUserDto,
  ): Promise<ResPutBadgeToUserDto> {
    const { userId, badgeId } = body;
    return await this.badgeService.putBadgeToUser({ userId, badgeId });
  }

  @Delete('/badge')
  @HttpCode(200)
  async deleteUserBadge(
    @Query() query: ReqDeleteUserBadgeQueryDto,
  ): Promise<ResDeleteUserBadgeDto> {
    const { userId, badgeId } = query;
    return await this.badgeService.deleteUserBadge({ userId, badgeId });
  }
}
