import {
  Controller,
  Inject,
  UseGuards,
  Req,
  Body,
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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import { Request } from 'express';
import { ReqBuyBadgeParamDto } from './dto/buyBadge.dto';
import { globalDocs } from '@shared/docs/global.docs';
import {
  ReqChangeSelectedBadgeDto,
  ResChangeSelectedBadgeDto,
} from './dto/changeSelectedBadge.dto';
import { ResGetUserBadgeListDto } from './dto/getUserBadgeList.dto';
import { ResGetAllBadgeProgressDto } from './dto/getAllBadgeProgress.dto';
import { ValidateBadgePipe } from '@shared/pipes/validateBadge.pipe';
import { buyBadgeDocs } from './docs/buyBadge.docs';
import { getUserBadgeListDocs } from './docs/getUserBadgeList.docs';
import { getAllBadgeProgressDocs } from './docs/getAllBadgeProgress.docs';
import { changeSelectedBadgeDocs } from './docs/changeSelectedBadge.docs';
import { ResGetAllBadgesDto } from './dto/getAllBadges.dto';

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
  @ApiOperation(getUserBadgeListDocs.operation)
  @ApiOkResponse(getUserBadgeListDocs.okResponse)
  async getUserBadgeList(
    @Req() req: Request,
  ): Promise<ResGetUserBadgeListDto[]> {
    return await this.badgeService.getUserBadgeList({ userId: req.user.id });
  }

  @ApiOperation(getAllBadgeProgressDocs.operation)
  @ApiOkResponse(getAllBadgeProgressDocs.okResponse)
  @Get('progress')
  async getAllBadgeProgress(
    @Req() req: Request,
  ): Promise<ResGetAllBadgeProgressDto[]> {
    return await this.badgeService.getAllBadgeProgress({ userId: req.user.id });
  }

  @ApiOperation(changeSelectedBadgeDocs.operation)
  @ApiOkResponse(changeSelectedBadgeDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  @Patch('selected')
  async changeSelectedBadge(
    @Req() req: Request,
    @Body(ValidateBadgePipe) body: ReqChangeSelectedBadgeDto,
  ): Promise<ResChangeSelectedBadgeDto> {
    return await this.badgeService.changeSelectedBadge({
      userId: req.user.id,
      badgeId: body.badgeId,
    });
  }

  @Get('all')
  async getAllBadges(): Promise<ResGetAllBadgesDto[]> {
    return await this.badgeService.getAllBadges();
  }
}
