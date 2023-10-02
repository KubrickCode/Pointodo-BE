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
  HttpStatus,
} from '@nestjs/common';
import { IBadgeService } from '@badge/domain/interfaces/Badge.service.interface';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/Jwt.guard';
import { Request } from 'express';
import { ReqBuyBadgeParamDto } from './dto/BuyBadge.dto';
import { globalDocs } from '@shared/docs/Global.docs';
import { ReqChangeSelectedBadgeParamDto } from './dto/ChangeSelectedBadge.dto';
import { ResGetUserBadgeListDto } from './dto/GetUserBadgeList.dto';
import { ResGetAllBadgeProgressDto } from './dto/GetAllBadgeProgress.dto';
import { ValidateBadgePipe } from '@shared/pipes/ValidateBadge.pipe';
import { buyBadgeDocs } from './docs/BuyBadge.docs';
import { getUserBadgeListDocs } from './docs/GetUserBadgeList.docs';
import { getAllBadgeProgressDocs } from './docs/GetAllBadgeProgress.docs';
import { changeSelectedBadgeDocs } from './docs/ChangeSelectedBadge.docs';
import { ResGetAllBadgesDto } from './dto/GetAllBadges.dto';
import { getAllBadgesDocs } from './docs/GetAllBadges.docs';
import { ProviderConstant } from '@shared/constants/Provider.constant';

@Controller('badges')
@ApiCookieAuth('accessToken')
@ApiTags('Badge')
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
export class BadgeController {
  constructor(
    @Inject(ProviderConstant.IBADGE_SERVICE)
    private readonly badgeService: IBadgeService,
  ) {}

  @Put('/:badgeId')
  @HttpCode(HttpStatus.CREATED)
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
  @HttpCode(HttpStatus.OK)
  @ApiOperation(getUserBadgeListDocs.operation)
  @ApiOkResponse(getUserBadgeListDocs.okResponse)
  async getUserBadgeList(
    @Req() req: Request,
  ): Promise<ResGetUserBadgeListDto[]> {
    return await this.badgeService.getUserBadgeList({ userId: req.user.id });
  }

  @Get('progress')
  @HttpCode(HttpStatus.OK)
  @ApiOperation(getAllBadgeProgressDocs.operation)
  @ApiOkResponse(getAllBadgeProgressDocs.okResponse)
  async getAllBadgeProgress(
    @Req() req: Request,
  ): Promise<ResGetAllBadgeProgressDto[]> {
    return await this.badgeService.getAllBadgeProgress({ userId: req.user.id });
  }

  @Patch('/:badgeId')
  @HttpCode(HttpStatus.NO_CONTENT)
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
  @HttpCode(HttpStatus.OK)
  @ApiOperation(getAllBadgesDocs.operation)
  @ApiOkResponse(getAllBadgesDocs.okResponse)
  async getAllBadges(): Promise<ResGetAllBadgesDto[]> {
    return await this.badgeService.getAllBadges();
  }
}
