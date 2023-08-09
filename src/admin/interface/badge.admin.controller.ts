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
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdminAuthGuard } from '@auth/infrastructure/passport/guards/admin.guard';
import { IBadgeAdminService } from '@admin/badge/domain/interfaces/badge.admin.service.interface';
import {
  ReqCreateBadgeTypeDto,
  ResCreateBadgeTypeDto,
} from '@admin/interface/dto/badge/createBadgeType.dto';
import {
  ReqUpdateBadgeTypeDto,
  ReqUpdateBadgeTypeParamDto,
  ResUpdateBadgeTypeDto,
} from '@admin/interface/dto/badge/updateBadgeType.dto';
import {
  ReqDeleteBadgeTypeParamDto,
  ResDeleteBadgeTypeDto,
} from '@admin/interface/dto/badge/deleteBadgeType.dto';
import { ResGetAllBadgeTypesDto } from '@admin/interface/dto/badge/getAllBadgeTypes.dto';
import { globalDocs } from '@shared/docs/global.docs';
import { getAllBadgeTypesDocs } from '@admin/interface/docs/badge/getAllBadgeTypes.admin.docs';
import { createBadgeTypeDocs } from '@admin/interface/docs/badge/createBadgeType.admin.docs';
import { updateBadgeTypeDocs } from '@admin/interface/docs/badge/updateBadgeType.admin.docs';
import { deleteBadgeTypeDocs } from '@admin/interface/docs/badge/deleteBadgeType.admin.docs';
import { adminDocs } from '@admin/interface/docs/admin.docs';

@ApiTags('Admin - Badge')
@ApiBearerAuth()
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
@ApiForbiddenResponse(adminDocs.forbidden)
@Controller('/admin/badge')
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class BadgeAdminController {
  constructor(
    @Inject('IBadgeAdminService')
    private readonly badgeAdminService: IBadgeAdminService,
  ) {}

  @Get('/all')
  @HttpCode(200)
  @ApiOperation(getAllBadgeTypesDocs.operation)
  @ApiOkResponse(getAllBadgeTypesDocs.okResponse)
  async getAllBadgeTypes(): Promise<ResGetAllBadgeTypesDto[]> {
    return await this.badgeAdminService.getAllBadgeTypes();
  }

  @Post('/create')
  @HttpCode(201)
  @ApiOperation(createBadgeTypeDocs.operation)
  @ApiOkResponse(createBadgeTypeDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  @ApiConflictResponse(createBadgeTypeDocs.conflict)
  async createBadgeType(
    @Body() body: ReqCreateBadgeTypeDto,
  ): Promise<ResCreateBadgeTypeDto> {
    return await this.badgeAdminService.createBadgeType(body);
  }

  @Patch('/update/:id')
  @HttpCode(201)
  @ApiOperation(updateBadgeTypeDocs.operation)
  @ApiOkResponse(updateBadgeTypeDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  @ApiConflictResponse(updateBadgeTypeDocs.conflict)
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
  @HttpCode(200)
  @ApiOperation(deleteBadgeTypeDocs.operation)
  @ApiOkResponse(deleteBadgeTypeDocs.okResponse)
  async deleteBadgeType(
    @Param() param: ReqDeleteBadgeTypeParamDto,
  ): Promise<ResDeleteBadgeTypeDto> {
    return await this.badgeAdminService.deleteBadgeType({ id: param.id });
  }
}
