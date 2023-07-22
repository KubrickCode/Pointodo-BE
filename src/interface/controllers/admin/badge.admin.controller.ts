import {
  Controller,
  UseGuards,
  Inject,
  Body,
  Post,
  Param,
  Delete,
  Patch,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '@infrastructure/auth/passport/guards/jwt.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdminAuthGuard } from '@infrastructure/auth/passport/guards/admin.guard';
import { IBadgeAdminService } from '@domain/admin/badge/interfaces/badge.admin.service.interface';
import {
  ReqCreateBadgeTypeDto,
  ResCreateBadgeTypeDto,
} from '@interface/dto/admin/badge/createBadgeType.dto';
import {
  ReqUpdateBadgeTypeDto,
  ReqUpdateBadgeTypeParamDto,
  ResUpdateBadgeTypeDto,
} from '@interface/dto/admin/badge/updateBadgeType.dto';
import {
  ReqDeleteBadgeTypeParamDto,
  ResDeleteBadgeTypeDto,
} from '@interface/dto/admin/badge/deleteBadgeType.dto';
import { ResGetAllBadgeTypesDto } from '@interface/dto/admin/badge/getAllBadgeTypes.dto';
import { globalDocs } from '@interface/docs/global/global.docs';
import { getAllBadgeTypesDocs } from '@interface/docs/admin/badge/getAllBadgeTypes.admin.docs';
import { createBadgeTypeDocs } from '@interface/docs/admin/badge/createBadgeType.admin.docs';
import { updateBadgeTypeDocs } from '@interface/docs/admin/badge/updateBadgeType.admin.docs';
import { deleteBadgeTypeDocs } from '@interface/docs/admin/badge/deleteBadgeType.admin.docs';

@ApiTags('Admin - Badge')
@ApiBearerAuth()
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
@Controller('/admin/badge')
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class BadgeAdminController {
  constructor(
    @Inject('IBadgeAdminService')
    private readonly badgeAdminService: IBadgeAdminService,
  ) {}

  @Get('/all')
  @ApiOperation(getAllBadgeTypesDocs.operation)
  @ApiOkResponse(getAllBadgeTypesDocs.okResponse)
  async getAllBadgeTypes(): Promise<ResGetAllBadgeTypesDto[]> {
    return await this.badgeAdminService.getAllBadgeTypes();
  }

  @Post('/create')
  @ApiOperation(createBadgeTypeDocs.operation)
  @ApiOkResponse(createBadgeTypeDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  async createBadgeType(
    @Body() body: ReqCreateBadgeTypeDto,
  ): Promise<ResCreateBadgeTypeDto> {
    return await this.badgeAdminService.createBadgeType(body);
  }

  @Patch('/update/:id')
  @ApiOperation(updateBadgeTypeDocs.operation)
  @ApiOkResponse(updateBadgeTypeDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  async updateBadgeType(
    @Body() body: ReqUpdateBadgeTypeDto,
    @Param() param: ReqUpdateBadgeTypeParamDto,
  ): Promise<ResUpdateBadgeTypeDto> {
    return await this.badgeAdminService.updateBadgeType({
      ...body,
      id: param.id,
    });
  }

  @Delete('/delete/:id')
  @ApiOperation(deleteBadgeTypeDocs.operation)
  @ApiOkResponse(deleteBadgeTypeDocs.okResponse)
  async deleteBadgeType(
    @Param() param: ReqDeleteBadgeTypeParamDto,
  ): Promise<ResDeleteBadgeTypeDto> {
    return await this.badgeAdminService.deleteBadgeType(param.id);
  }
}
