import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserAppService } from './user.app.service';
import { UserService } from '@domain/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '@infrastructure/user/prisma/user.repository';
import { PrismaService } from '@infrastructure/services/prisma.service';
import { PasswordHasher } from '@infrastructure/user/passwordHasher';

@Module({
  controllers: [UserController],
  providers: [
    UserAppService,
    UserService,
    UserRepository,
    PrismaService,
    PasswordHasher,
  ],
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class UserModule {}
