import { AdminAuthGuard } from '@auth/infrastructure/passport/guards/Admin.guard';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/Jwt.guard';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { adminDocs } from './docs/Admin.docs';
import { globalDocs } from '@shared/docs/Global.docs';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ReqAdminGetUserListQueryDto,
  ResAdminGetUserListDto,
} from './dto/user/GetUserList.admin.dto';
import { IUserService } from '@user/domain/interfaces/User.service.interface';
import {
  ReqAdminGetTotalUserListPagesQueryDto,
  ResAdminGetTotalUserListPagesDto,
} from './dto/user/GetTotalUserListPages.admin.dto';
import {
  ResAdminGetUserBadgeListDto,
  ReqAdminGetUserBadgeListParamDto,
} from './dto/user/GetUserBadgeList.admin.dto';
import { IBadgeService } from '@badge/domain/interfaces/Badge.service.interface';
import { ReqAdminPutBadgeToUserQueryDto } from './dto/user/PutBadgeToUser.admin.dto';
import { ReqAdminDeleteUserBadgeQueryDto } from './dto/user/DeleteUserBadge.admin.dto';
import { getUserListDocs } from './docs/user/GetUserList.admin.docs';
import { getTotalUserListPagesDocs } from './docs/user/GetTotalUserListPages.admin.docs';
import { getUserBadgeListDocs } from '@badge/interface/docs/GetUserBadgeList.docs';
import { putBadgeToUserDocs } from './docs/user/PutBadgeToUser.admin.docs';
import { deleteUserBadgeDocs } from './docs/user/DeleteUserBadge.admin.docs';
import { ProviderConstant } from '@shared/constants/Provider.constant';
import {
  ReqGetTopUsersOnDateQueryDto,
  ResGetTopUsersOnDateDto,
} from './dto/user/GetTopUserOnDate.dto';
import { plainToClass } from 'class-transformer';
@Controller('/admin/users')
@ApiTags('Admin - User')
@ApiCookieAuth('accessToken')
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
@ApiForbiddenResponse(adminDocs.forbidden)
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class UserAdminController {
  constructor(
    @Inject(ProviderConstant.IUSER_SERVICE)
    private readonly userService: IUserService,
    @Inject(ProviderConstant.IBADGE_SERVICE)
    private readonly badgeService: IBadgeService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation(getUserListDocs.operation)
  @ApiOkResponse(getUserListDocs.okResponse)
  async getUserList(
    @Query() query: ReqAdminGetUserListQueryDto,
  ): Promise<ResAdminGetUserListDto[]> {
    return await this.userService.getUserList({
      ...query,
    });
  }

  @Get('/count-pages')
  @HttpCode(HttpStatus.OK)
  @ApiOperation(getTotalUserListPagesDocs.operation)
  @ApiOkResponse(getTotalUserListPagesDocs.okResponse)
  async getTotalUserListPages(
    @Query() query: ReqAdminGetTotalUserListPagesQueryDto,
  ): Promise<ResAdminGetTotalUserListPagesDto> {
    return await this.userService.getTotalUserListPages({ ...query });
  }

  @Get('/badges/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation(getUserBadgeListDocs.operation)
  @ApiOkResponse(getUserBadgeListDocs.okResponse)
  async getUserBadgeList(
    @Param() param: ReqAdminGetUserBadgeListParamDto,
  ): Promise<ResAdminGetUserBadgeListDto[]> {
    const { id } = param;
    return await this.badgeService.getUserBadgeListWithName({ userId: id });
  }

  @Put('/badges')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation(putBadgeToUserDocs.operation)
  @ApiNoContentResponse(putBadgeToUserDocs.noContentResponse)
  async putBadgeToUser(
    @Query() query: ReqAdminPutBadgeToUserQueryDto,
  ): Promise<void> {
    const { userId, badgeId } = query;
    await this.badgeService.putBadgeToUser({ userId, badgeId });
  }

  @Delete('/badges')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation(deleteUserBadgeDocs.operation)
  @ApiNoContentResponse(deleteUserBadgeDocs.noContentResponse)
  async deleteUserBadge(
    @Query() query: ReqAdminDeleteUserBadgeQueryDto,
  ): Promise<void> {
    const { userId, badgeId } = query;
    await this.badgeService.deleteUserBadge({ userId, badgeId });
  }

  @Get('/top-users')
  async getTopUserOnDate(
    @Query() query: ReqGetTopUsersOnDateQueryDto,
  ): Promise<ResGetTopUsersOnDateDto[]> {
    const result = await this.userService.getTopUsersOnDate({ ...query });
    return result.map((item) => plainToClass(ResGetTopUsersOnDateDto, item));
  }
}
