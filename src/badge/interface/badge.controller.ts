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
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import { Request } from 'express';
import { ReqBuyBadgeDto } from './dto/buyBadge.dto';
import { globalDocs } from '@shared/docs/global.docs';
import {
  ReqChangeSelectedBadgeDto,
  ResChangeSelectedBadgeDto,
} from './dto/changeSelectedBadge.dto';
import { ResGetUserBadgeListDto } from './dto/getUserBadgeList.dto';
import { ResGetAllBadgeProgressDto } from './dto/getAllBadgeProgress.dto';
import { ValidateBadgeTypePipe } from '@shared/pipes/validateBadgeType.pipe';

@Controller('badge')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
export class BadgeController {
  constructor(
    @Inject('IBadgeService')
    private readonly badgeService: IBadgeService,
  ) {}

  @Post('buy')
  async buyBadge(
    @Req() req: Request,
    @Body(ValidateBadgeTypePipe) body: ReqBuyBadgeDto,
  ) {
    return await this.badgeService.buyBadge({
      userId: req.user.id,
      badgeType: body.badgeType,
    });
  }

  @Get('list')
  async getUserBadgeList(
    @Req() req: Request,
  ): Promise<ResGetUserBadgeListDto[]> {
    return await this.badgeService.getUserBadgeList({ userId: req.user.id });
  }

  @Get('progress')
  async getAllBadgeProgress(
    @Req() req: Request,
  ): Promise<ResGetAllBadgeProgressDto[]> {
    return await this.badgeService.getAllBadgeProgress({ userId: req.user.id });
  }

  @Patch('selected')
  async changeSelectedBadge(
    @Req() req: Request,
    @Body(ValidateBadgeTypePipe) body: ReqChangeSelectedBadgeDto,
  ): Promise<ResChangeSelectedBadgeDto> {
    return await this.badgeService.changeSelectedBadge({
      userId: req.user.id,
      badgeType: body.badgeType,
    });
  }
}
