import { Controller, Get, UseGuards, Inject, Body } from '@nestjs/common';
import { JwtAuthGuard } from '@infrastructure/auth/passport/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from '@infrastructure/auth/passport/guards/admin.guard';
import { IBadgeAdminService } from '@domain/admin/badge/interfaces/badge.admin.service.interface';
import {
  ReqCreateBadgeTypeDto,
  ResCreateBadgeTypeDto,
} from '@interface/dto/admin/badge/createBadgeType.dto';

@ApiTags('Admin')
@Controller('admin')
export class BadgeAdminController {
  constructor(
    @Inject('IBadgeAdminService')
    private readonly badgeAdminService: IBadgeAdminService,
  ) {}

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Get()
  async register(
    @Body() body: ReqCreateBadgeTypeDto,
  ): Promise<ResCreateBadgeTypeDto> {
    return await this.badgeAdminService.createBadgeType(body);
  }
}
