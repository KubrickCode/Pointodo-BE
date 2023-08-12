import { IPasswordHasher } from '@user/domain/interfaces/passwordHasher.interface';

describe('HashPassword', () => {
  let passwordHashwer: IPasswordHasher;
  beforeEach(() => {
    passwordHashwer = {
      hashPassword: jest.fn(),
      comparePassword: jest.fn(),
    };
  });

  it('비밀번호 해싱 성공', async () => {
    const password = 'test1234!@';
    const hashedPassword = 'hashed1234!@';

    jest
      .spyOn(passwordHashwer, 'hashPassword')
      .mockResolvedValue(hashedPassword);

    const result = await passwordHashwer.hashPassword(password);

    expect(result).toEqual(hashedPassword);
    expect(passwordHashwer.hashPassword).toHaveBeenCalledWith(password);
  });
});
