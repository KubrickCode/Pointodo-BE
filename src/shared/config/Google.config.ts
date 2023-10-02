import { ConfigService } from '@nestjs/config';

export const googleConfig = (configService: ConfigService) => {
  return {
    googleId: configService.get('GOOGLE_ID'),
    googleSecret: configService.get('GOOGLE_SECRET'),
    googleCallback: configService.get('GOOGLE_CALLBACK'),
  };
};
