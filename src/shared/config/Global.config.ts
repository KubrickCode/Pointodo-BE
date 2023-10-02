import { ConfigService } from '@nestjs/config';

export const globalConfig = (configService: ConfigService) => {
  return {
    clientOrigin: configService.get('ORIGIN'),
    defaultBadgeLink: configService.get('DEFAULT_BADGE_LINK'),
  };
};
