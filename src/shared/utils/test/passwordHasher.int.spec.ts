import { PasswordHasher } from '../passwordHasher';

describe('passwordHasher', () => {
  let passwordHasher: PasswordHasher;

  beforeAll(() => {
    passwordHasher = new PasswordHasher();
  });

  const password = 'test';

  it('hashPassword', async () => {
    const hash = await passwordHasher.hashPassword(password);
    expect(hash.length).toEqual(60);
    expect(typeof hash).toEqual('string');
  });

  it('comparePassword', async () => {
    const hash = await passwordHasher.hashPassword(password);
    const compared = await passwordHasher.comparePassword(password, hash);
    expect(compared).toBeTruthy();
  });
});
