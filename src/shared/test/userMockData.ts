export const TEST1_USER_LOCAL = {
  id: '392e779f-5712-4aad-8c89-b2c61dee9601',
  selectedBadgeId: 1,
  email: 'test1@gmail.com',
  provider: 'LOCAL',
  role: 'USER',
  createdAt: new Date('2023-08-29T00:39:19.844Z'),
  selectedBadge: {
    iconLink:
      'https://pointodo-s3-bucket.s3.ap-northeast-2.amazonaws.com/pointodo/%EA%B8%B0%EB%B3%B8.png',
  },
};

export const TEST1_USER_LOCAL_WITH_PASSWORD = {
  ...TEST1_USER_LOCAL,
  password: 'test1234!@',
};

export const TEST_ACCESS_TOKEN = 'accessToken';
export const TEST_REFRESH_TOKEN = 'refreshToken';
