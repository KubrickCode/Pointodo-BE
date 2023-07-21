import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@infrastructure/auth/passport/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from '@infrastructure/auth/passport/guards/admin.guard';

@ApiTags('Admin')
@Controller('admin')
export class BadgeAdminController {
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Get()
  async register(@Req() req: any): Promise<any> {
    console.log(req.user);
  }
}
