import { ConfigService } from '@nestjs/config';

export const corsOptions = (configService: ConfigService) => {
  return {
    origin: configService.get('ORIGIN'),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  };
};
