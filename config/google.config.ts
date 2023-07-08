import { ConfigService } from '@nestjs/config';

export const googleConfig = (configService: ConfigService) => {
  const googleId = configService.get('GOOGLE_ID');
  const googleSecret = configService.get('GOOGLE_SECRET');
  const googleCallback = configService.get('GOOGLE_CALLBACK');

  return {
    googleId,
    googleSecret,
    googleCallback,
  };
};
