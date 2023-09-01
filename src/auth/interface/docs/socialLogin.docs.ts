export const socialLoginDocs = {
  google: {
    operation: {
      summary: '구글 로그인',
      description: `구글 로그인\n
    구글 로그인을 진행합니다.\n
    인증이 정상적으로 완료되었을 경우, 쿠키에 액세스 토큰과 리프레시 토큰을 정의하고,\n
    클라이언트의 루트 경로로 리디렉션 합니다.
    `,
    },
    foundResponse: {
      description: `구글 계정 인증 성공 및 클라이언트 리다이렉트\n
      리다이렉션 경로 : /
      `,
    },
  },
  kakao: {
    operation: {
      summary: '카카오 로그인',
      description: `카카오 로그인\n
    카카오 로그인을 진행합니다.\n
    인증이 정상적으로 완료되었을 경우, 쿠키에 액세스 토큰과 리프레시 토큰을 정의하고,\n
    클라이언트의 루트 경로로 리디렉션 합니다.
    `,
    },
    foundResponse: {
      description: `구글 계정 인증 성공 및 클라이언트 리다이렉트\n
      리다이렉션 경로 : /
      `,
    },
  },
};
