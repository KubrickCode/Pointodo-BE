export const validateLoggedInDocs = {
  operation: {
    summary: '로그인 상태 확인',
    description: `로그인 상태 확인\n
    액세스 토큰을 헤더로 요청받은 후,\n
    로그인 상태를 확인하고, 검증 성공시, true를 반환합니다.
    `,
  },
  okResponse: { description: '로그인 상태' },
};
