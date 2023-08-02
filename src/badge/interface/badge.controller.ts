import {
  Controller,
  Inject,
  Post,
  UseGuards,
  Req,
  Body,
  Patch,
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
import { VerifyBadgePipe } from './pipes/verifyBadge.pipe';

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
  async buyBadge(@Req() req: Request, @Body() body: ReqBuyBadgeDto) {
    return await this.badgeService.buyBadge({
      userId: req.user.id,
      badgeType: body.badgeType,
    });
  }

  @Patch('selected')
  async changeSelectedBadge(
    @Req() req: Request,
    @Body(VerifyBadgePipe) body: ReqChangeSelectedBadgeDto,
  ): Promise<ResChangeSelectedBadgeDto> {
    return await this.badgeService.changeSelectedBadge({
      userId: req.user.id,
      badgeType: body.badgeType,
    });
  }
}
