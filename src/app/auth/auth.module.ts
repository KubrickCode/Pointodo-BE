import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthAppService } from './auth.app.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '@domain/auth/auth.service';
import { UserRepository } from '@infrastructure/user/prisma/user.repository';
import { PasswordHasher } from '@infrastructure/user/passwordHasher';
import { PrismaService } from '@infrastructure/services/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@infrastructure/auth/passport/strategies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthAppService,
    AuthService,
    PrismaService,
    LocalStrategy,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IPasswordHasher',
      useClass: PasswordHasher,
    },
  ],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
