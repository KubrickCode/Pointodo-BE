import { AdminAuthGuard } from '@auth/infrastructure/passport/guards/admin.guard';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import { Controller, UseGuards } from '@nestjs/common';
import { adminDocs } from './docs/admin.docs';
import { globalDocs } from '@shared/docs/global.docs';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Admin - User')
@ApiBearerAuth()
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
@ApiForbiddenResponse(adminDocs.forbidden)
@Controller('/admin/user')
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class UserAdminController {}
