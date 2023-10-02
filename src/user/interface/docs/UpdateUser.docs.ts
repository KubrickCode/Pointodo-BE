export const updateUserDocs = {
  operation: {
    summary: '유저 업데이트',
    description: `로컬 유저 정보 변경\n
    유저 정보 중 선택적으로 body로 전달받아 업데이트 시킴.\n
    업데이트 가능 항목 : 비밀번호
  `,
  },
  noContentResponse: {
    description: '유저 정보 업데이트 성공',
  },
};
