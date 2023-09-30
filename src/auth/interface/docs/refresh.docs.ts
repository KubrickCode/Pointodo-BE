import { AuthErrorMessage } from '@shared/messages/auth/auth.errors';

export const refreshDocs = {
  operation: {
    summary: '리프레시 토큰 재검증',
    description: `리프레시 토큰 재검증\n
  액세스 토큰이 만료되었을 경우 리프레시 토큰을 재검증합니다.
  `,
  },
  createdResponse: {
    description:
      '리프레시 토큰 정상적으로 검증 및, 새로운 액세스 토큰을 발급하여 쿠키에 정의',
  },
  unauthorizedResponse: {
    description: `리프레시 토큰 검증 실패 및 쿠키에 정의된 액세스 토큰과 리프레시 토큰 삭제\n
      에러 메시지 유형: ${AuthErrorMessage.AUTH_INVALID_TOKEN} or ${AuthErrorMessage.AUTH_EXPIRED_REFRESH_TOKEN}
      `,
  },
};
