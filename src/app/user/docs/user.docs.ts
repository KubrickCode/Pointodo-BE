export const userDocs = {
  register: {
    summary: '회원 가입',
    description: `로컬 유저 생성\n
  이메일과 패스워드를 전달받아 로컬 유저를 생성하고, 성공 메시지가 반환됩니다.
  `,
  },
  getUser: {
    summary: '유저 정보 요청',
    description: `유저 정보 요청\n
  ID, 이메일, 공급업체, 권한, 뱃지ID, 가입날짜 가 제공됩니다.
  `,
  },
};
