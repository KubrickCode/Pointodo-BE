import { ResInvalidation } from '@interface/dto/global/global.dto';
import { ResTokenUnauthorized } from 'src/interface/dto/auth/tokenError.dto';

export const globalDocs = {
  invalidationResponse: {
    type: ResInvalidation,
    description: '필드 유효성 검사 실패',
  },
  unauthorizedResponse: {
    type: ResTokenUnauthorized,
    description: '만료된 토큰입니다 | 유효하지 않은 토큰입니다',
  },
};
