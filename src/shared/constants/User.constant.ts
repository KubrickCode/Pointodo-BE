export class UserConstant {
  static USER_ID = '유저 고유 ID(UUID)';
  static USER_EMAIL = '유저 이메일';
  static USER_EMAIL_EXAMPLE = 'test@gmail.com';
  static USER_PROVIDER = '회원 공급 업체';
  static USER_PROVIDER_EXAMPLE = 'LOCAL | GOOGLE | KAKAO';
  static USER_ROLE = '유저 권한';
  static USER_ROLE_EXAMPLE = 'USER | ADMIN';
  static USER_PWD = '비밀번호(6~20자 영문, 숫자, 특수문자 혼합)';
  static USER_PWD_EXAMPLE = 'test1234!@';
  static USER_SELECTED_BADGE_ID = '선택 뱃지 ID';
  static USER_REGISTER_DATE = '가입 날짜';
  static USER_VALIDATION = '인증 여부';
  static JWT_ACCESS_TOKEN = 'JWT 액세스 토큰';
  static JWT_REFRESH_TOKEN = 'JWT 리프레시 토큰 - 쿠키 설정';
  static USER_LIST_PAGE = '유저 리스트 페이지';
  static USER_LIST_LIMIT = '페이지당 유저 수';
}
