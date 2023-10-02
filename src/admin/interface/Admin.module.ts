import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BadgeAdminController } from '@admin/interface/Badge.admin.controller';
import { jwtConfig } from '@shared/config/Jwt.config';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from '@shared/utils/Multer.options.factory';
import { UserAdminController } from './User.admin.controller';
import { AdminProvider } from './Admin.provider';
import { UserModule } from '@user/interface/User.module';
import { AuthModule } from '@auth/interface/Auth.module';
import { BadgeModule } from '@badge/interface/Badge.module';
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
