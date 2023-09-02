import { AdminAuthGuard } from '@auth/infrastructure/passport/guards/admin.guard';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import {
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
  ReqAdminGetUserListQueryDto,
  ResAdminGetUserListDto,
} from './dto/user/getUserList.admin.dto';
import { IUserService } from '@user/domain/interfaces/user.service.interface';
import {
  ReqAdminGetTotalUserListPagesQueryDto,
  ResAdminGetTotalUserListPagesDto,
} from './dto/user/getTotalUserListPages.admin.dto';
import {
  ResAdminGetUserBadgeListDto,
  ReqAdminGetUserBadgeListParamDto,
} from './dto/user/getUserBadgeList.admin.dto';
import { IBadgeService } from '@badge/domain/interfaces/badge.service.interface';
import { ReqAdminPutBadgeToUserQueryDto } from './dto/user/putBadgeToUser.admin.dto';
import { ReqAdminDeleteUserBadgeQueryDto } from './dto/user/deleteUserBadge.admin.dto';

@ApiTags('Admin - User')
@ApiBearerAuth()
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
@ApiForbiddenResponse(adminDocs.forbidden)
@Controller('/admin/users')
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class UserAdminController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
    @Inject('IBadgeService')
    private readonly badgeService: IBadgeService,
  ) {}

  @Get()
  @HttpCode(200)
  async getUserList(
    @Query() query: ReqAdminGetUserListQueryDto,
  ): Promise<ResAdminGetUserListDto[]> {
    return await this.userService.getUserList({
      ...query,
    });
  }

  @Get('/count-pages')
  @HttpCode(200)
  async getTotalUserListPages(
    @Query() query: ReqAdminGetTotalUserListPagesQueryDto,
  ): Promise<ResAdminGetTotalUserListPagesDto> {
    return await this.userService.getTotalUserListPages({ ...query });
  }

  @Get('/badges/:id')
  @HttpCode(200)
  async getUserBadgeList(
    @Param() param: ReqAdminGetUserBadgeListParamDto,
  ): Promise<ResAdminGetUserBadgeListDto[]> {
    const { id } = param;
    return await this.badgeService.getUserBadgeListWithName({ userId: id });
  }

  @Put('/badges')
  @HttpCode(204)
  async putBadgeToUser(
    @Query() query: ReqAdminPutBadgeToUserQueryDto,
  ): Promise<void> {
    const { userId, badgeId } = query;
    await this.badgeService.putBadgeToUser({ userId, badgeId });
  }

  @Delete('/badges')
  @HttpCode(204)
  async deleteUserBadge(
    @Query() query: ReqAdminDeleteUserBadgeQueryDto,
  ): Promise<void> {
    const { userId, badgeId } = query;
    await this.badgeService.deleteUserBadge({ userId, badgeId });
  }
}
