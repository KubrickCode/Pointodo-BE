import { ConfigService } from '@nestjs/config';

export const globalConfig = (configService: ConfigService) => {
  const clientOrigin = configService.get('ORIGIN');

  return {
    clientOrigin,
  };
};
