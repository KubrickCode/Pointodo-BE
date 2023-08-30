import { ProviderType, RoleType } from '@user/domain/entities/user.entity';
import { UUID } from 'crypto';

export const TEST1_USER_LOCAL = {
  id: '392e779f-5712-4aad-8c89-b2c61dee9601' as UUID,
  selectedBadgeId: 1,
  email: 'test1@gmail.com',
  provider: 'LOCAL' as ProviderType,
  role: 'MASTER' as RoleType,
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
  provider: 'GOOGLE' as ProviderType,
  role: 'ADMIN' as RoleType,
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
  provider: 'KAKAO' as ProviderType,
  role: 'USER' as RoleType,
  createdAt: new Date(),
  selectedBadge: {
    iconLink:
      'https://pointodo-s3-bucket.s3.ap-northeast-2.amazonaws.com/pointodo/%EA%B8%B0%EB%B3%B8.png',
  },
};

export const MOCK_USER = {
  id: 'uuid-uuid-uuid-uuid-uuid' as UUID,
  selectedBadgeId: 1,
  email: 'test@test.test',
  provider: 'LOCAL' as ProviderType,
  role: 'USER' as RoleType,
  createdAt: new Date(),
};

export const TEST_PASSWORD = 'test1234!@';

export const MOCK_USER_WITH_PWD = {
  ...MOCK_USER,
  password: TEST_PASSWORD,
};

export const TEST1_USER_LOCAL_WITH_PASSWORD = {
  ...TEST1_USER_LOCAL,
  password: TEST_PASSWORD,
};

export const TEST_ACCESS_TOKEN = 'accessToken';
export const TEST_REFRESH_TOKEN = 'refreshToken';
