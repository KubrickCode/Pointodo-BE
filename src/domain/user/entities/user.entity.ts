import { v4 as uuidv4 } from 'uuid';

export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public provider: Provider,
    public role: Role,
    public defaultBadgeId: number,
    public createdAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.provider = provider;
    this.role = role;
    this.defaultBadgeId = defaultBadgeId;
    this.createdAt = createdAt;
  }

  static createNew(email: string, password: string): User {
    const id = uuidv4();
    const provider = Provider.Local;
    const role = Role.User;
    const defaultBadgeId = 0;
    const createdAt = new Date();

    return new User(
      id,
      email,
      password,
      provider,
      role,
      defaultBadgeId,
      createdAt,
    );
  }
}

export enum Provider {
  Local,
  Google,
  KaKao,
}

export enum Role {
  User,
  Admin,
}
