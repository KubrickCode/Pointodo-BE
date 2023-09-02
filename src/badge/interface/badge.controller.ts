import {
  Controller,
  Inject,
  UseGuards,
  Req,
  Patch,
  Get,
  Put,
  Param,
  HttpCode,
} from '@nestjs/common';
import { IBadgeService } from '@badge/domain/interfaces/badge.service.interface';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import { Request } from 'express';
import { ReqBuyBadgeParamDto } from './dto/buyBadge.dto';
import { globalDocs } from '@shared/docs/global.docs';
import { ReqChangeSelectedBadgeParamDto } from './dto/changeSelectedBadge.dto';
import { ResGetUserBadgeListDto } from './dto/getUserBadgeList.dto';
import { ResGetAllBadgeProgressDto } from './dto/getAllBadgeProgress.dto';
import { ValidateBadgePipe } from '@shared/pipes/validateBadge.pipe';
import { buyBadgeDocs } from './docs/buyBadge.docs';
import { getUserBadgeListDocs } from './docs/getUserBadgeList.docs';
import { getAllBadgeProgressDocs } from './docs/getAllBadgeProgress.docs';
import { changeSelectedBadgeDocs } from './docs/changeSelectedBadge.docs';
import { ResGetAllBadgesDto } from './dto/getAllBadges.dto';
import { getAllBadgesDocs } from './docs/getAllBadges.docs';

@Controller('badges')
@ApiTags('Badge')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
export class BadgeController {
  constructor(
    @Inject('IBadgeService')
    private readonly badgeService: IBadgeService,
  ) {}

  @Put('/:badgeId')
  @HttpCode(201)
  @ApiOperation(buyBadgeDocs.operation)
  @ApiCreatedResponse(buyBadgeDocs.createdResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  @ApiConflictResponse(buyBadgeDocs.conflictError)
  async buyBadge(
    @Req() req: Request,
    @Param(ValidateBadgePipe) param: ReqBuyBadgeParamDto,
  ): Promise<void> {
    await this.badgeService.buyBadge({
      userId: req.user.id,
      badgeId: param.badgeId,
    });
  }

  @Get('personal')
  @HttpCode(200)
  @ApiOperation(getUserBadgeListDocs.operation)
  @ApiOkResponse(getUserBadgeListDocs.okResponse)
  async getUserBadgeList(
    @Req() req: Request,
  ): Promise<ResGetUserBadgeListDto[]> {
    return await this.badgeService.getUserBadgeList({ userId: req.user.id });
  }

  @Get('progress')
  @HttpCode(200)
  @ApiOperation(getAllBadgeProgressDocs.operation)
  @ApiOkResponse(getAllBadgeProgressDocs.okResponse)
  async getAllBadgeProgress(
    @Req() req: Request,
  ): Promise<ResGetAllBadgeProgressDto[]> {
    return await this.badgeService.getAllBadgeProgress({ userId: req.user.id });
  }

  @Patch('/:badgeId')
  @HttpCode(204)
  @ApiOperation(changeSelectedBadgeDocs.operation)
  @ApiNoContentResponse(changeSelectedBadgeDocs.noContentResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  async changeSelectedBadge(
    @Req() req: Request,
    @Param(ValidateBadgePipe) param: ReqChangeSelectedBadgeParamDto,
  ): Promise<void> {
    await this.badgeService.changeSelectedBadge({
      userId: req.user.id,
      badgeId: param.badgeId,
    });
  }

  @Get()
  @HttpCode(200)
  @ApiOperation(getAllBadgesDocs.operation)
  @ApiOkResponse(getAllBadgesDocs.okResponse)
  async getAllBadges(): Promise<ResGetAllBadgesDto[]> {
    return await this.badgeService.getAllBadges();
  }
}
