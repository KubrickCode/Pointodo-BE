import { ConfigService } from '@nestjs/config';

export const kakaoConfig = (configService: ConfigService) => {
  return {
    kakaoId: configService.get('KAKAO_ID'),
    kakaoCallback: configService.get('KAKAO_CALLBACK'),
  };
};
