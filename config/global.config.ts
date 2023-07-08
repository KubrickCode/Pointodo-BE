import { ConfigService } from '@nestjs/config';

export const globalConfig = (configService: ConfigService) => {
  return {
    clientOrigin: configService.get('ORIGIN'),
  };
};
