export const mockUserRepository = {
  createUser: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn(),
  findPasswordById: jest.fn(),
  changePassword: jest.fn(),
  deleteUser: jest.fn(),
  changeSelectedBadge: jest.fn(),
  changeSelectedBadgeToDefault: jest.fn(),
  getUserList: jest.fn(),
  getTotalUserListPages: jest.fn(),
};
