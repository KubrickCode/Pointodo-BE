import { ConfigService } from '@nestjs/config';

export const kakaoConfig = (configService: ConfigService) => {
  const kakaoId = configService.get('KAKAO_ID');
  const kakaoCallback = configService.get('KAKAO_CALLBACK');

  return {
    kakaoId,
    kakaoCallback,
  };
};
