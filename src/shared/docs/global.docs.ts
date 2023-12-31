import { ResInvalidation } from '@shared/dto/global.dto';
import { ResTokenUnauthorized } from '@auth/interface/dto/tokenError.dto';

export const globalDocs = {
  invalidationResponse: {
    type: ResInvalidation,
    description: `필드 유효성 검사 실패 에러 \n
    각종 유효성 검사 실패 케이스 메시지 반환
    `,
  },
  unauthorizedResponse: {
    type: ResTokenUnauthorized,
    description: `토큰 인증 실패 에러 \n
    만료된 토큰입니다 | 유효하지 않은 토큰입니다`,
  },
};
