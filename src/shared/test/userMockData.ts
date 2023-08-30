import { UUID } from 'crypto';

export const TEST1_USER_LOCAL = {
  id: '392e779f-5712-4aad-8c89-b2c61dee9601' as UUID,
  selectedBadgeId: 1,
  email: 'test1@gmail.com',
  provider: 'LOCAL',
  role: 'MASTER',
  createdAt: new Date('2023-08-29T00:39:19.844Z'),
  selectedBadge: {
    iconLink:
      'https://pointodo-s3-bucket.s3.ap-northeast-2.amazonaws.com/pointodo/%EA%B8%B0%EB%B3%B8.png',
  },
};

export const TEST2_USER_GOOGLE = {
  id: '6bd015a0-ac2b-44ca-b81c-f49dd89ecbf4' as UUID,
  selectedBadgeId: 1,
  email: 'test2@gmail.com',
  provider: 'GOOGLE',
  role: 'ADMIN',
  createdAt: new Date(),
  selectedBadge: {
    iconLink:
      'https://pointodo-s3-bucket.s3.ap-northeast-2.amazonaws.com/pointodo/%EA%B8%B0%EB%B3%B8.png',
  },
};

export const TEST3_USER_KAKAO = {
  id: 'cce87b30-51cc-43d0-b0cb-76ad19d82b3a' as UUID,
  selectedBadgeId: 1,
  email: 'test3@kakao.com',
  provider: 'KAKAO',
  role: 'USER',
  createdAt: new Date(),
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
