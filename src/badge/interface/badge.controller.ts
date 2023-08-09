import {
  Controller,
  Inject,
  Post,
  UseGuards,
  Req,
  Body,
  Patch,
  Get,
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
import { ReqBuyBadgeDto, ResBuyBadgeDto } from './dto/buyBadge.dto';
import { globalDocs } from '@shared/docs/global.docs';
import {
  ReqChangeSelectedBadgeDto,
  ResChangeSelectedBadgeDto,
} from './dto/changeSelectedBadge.dto';
import { ResGetUserBadgeListDto } from './dto/getUserBadgeList.dto';
import { ResGetAllBadgeProgressDto } from './dto/getAllBadgeProgress.dto';
import { ValidateBadgeTypePipe } from '@shared/pipes/validateBadgeType.pipe';
import { buyBadgeDocs } from './docs/buyBadge.docs';
import { getUserBadgeListDocs } from './docs/getUserBadgeList.docs';
import { getAllBadgeProgressDocs } from './docs/getAllBadgeProgress.docs';
import { changeSelectedBadgeDocs } from './docs/changeSelectedBadge.docs';

@Controller('badge')
@ApiTags('Badge')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
export class BadgeController {
  constructor(
    @Inject('IBadgeService')
    private readonly badgeService: IBadgeService,
  ) {}

  @Post('buy')
  @ApiOperation(buyBadgeDocs.operation)
  @ApiCreatedResponse(buyBadgeDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  @ApiConflictResponse(buyBadgeDocs.conflictError)
  async buyBadge(
    @Req() req: Request,
    @Body(ValidateBadgeTypePipe) body: ReqBuyBadgeDto,
  ): Promise<ResBuyBadgeDto> {
    return await this.badgeService.buyBadge({
      userId: req.user.id,
      badgeId: body.badgeId,
    });
  }

  @ApiOperation(getUserBadgeListDocs.operation)
  @ApiOkResponse(getUserBadgeListDocs.okResponse)
  @Get('list')
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
    @Body(ValidateBadgeTypePipe) body: ReqChangeSelectedBadgeDto,
  ): Promise<ResChangeSelectedBadgeDto> {
    return await this.badgeService.changeSelectedBadge({
      userId: req.user.id,
      badgeId: body.badgeId,
    });
  }
}
