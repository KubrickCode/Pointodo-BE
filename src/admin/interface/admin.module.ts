import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BadgeAdminController } from '@admin/interface/badge.admin.controller';
import { jwtConfig } from '@shared/config/jwt.config';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from '@shared/utils/multer.options.factory';
import { UserAdminController } from './user.admin.controller';
import { AdminProvider } from './admin.provider';
import { UserModule } from '@user/interface/user.module';
import { AuthModule } from '@auth/interface/auth.module';
import { BadgeModule } from '@badge/interface/badge.module';
@Module({
  controllers: [BadgeAdminController, UserAdminController],
  providers: AdminProvider,
  imports: [
    UserModule,
    AuthModule,
    BadgeModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: jwtConfig(configService).accessTokenSecret,
        signOptions: {
          expiresIn: jwtConfig(configService).accessTokenExpiration,
        },
      }),
      inject: [ConfigService],
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerOptionsFactory,
      inject: [ConfigService],
    }),
  ],
})
export class AdminModule {}
